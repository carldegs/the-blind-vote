import { createSelector } from '@reduxjs/toolkit';

import { CANDIDATES } from '../constants';
import { RootState } from '../store';

export const selectPoll = (state: RootState) => state.poll;

export const selectProfile = createSelector(
  [selectPoll],
  (poll) => poll.profile
);
export const selectSelectedIssues = createSelector(
  [selectPoll],
  (poll) => poll.selectedIssues
);
export const selectStands = createSelector([selectPoll], (poll) => poll.stands);
export const selectControversies = createSelector(
  [selectPoll],
  (poll) => poll.controversies
);

// validation
export const selectValidSelectIssuePage = createSelector(
  [selectProfile],
  (profile) => !!profile
);

export const selectValidIssuesPage = createSelector(
  [selectValidSelectIssuePage, selectSelectedIssues],
  (isValidSelectIssuePage, selectedIssues) =>
    isValidSelectIssuePage && !!selectedIssues.length
);

export const selectValidControversiesPage = createSelector(
  [selectValidIssuesPage, selectStands],
  (isValidIssuesPage, stands) =>
    isValidIssuesPage && Object.values(stands).every((stand) => stand)
);

export const selectValidResultsPage = createSelector(
  [selectValidControversiesPage, selectControversies],
  (isValidControversiesPage, controversies) =>
    isValidControversiesPage && !!controversies.length
);

// results
export const selectResults = createSelector(
  [selectProfile, selectSelectedIssues, selectStands, selectControversies],
  (profile, selectedIssues, stands, controversies) => {
    let results = Object.fromEntries(
      Object.values(CANDIDATES).map(({ id }) => [
        id,
        {
          score: 0,
          selected: {
            profile: false,
            stands: Object.fromEntries(
              selectedIssues.map((issue) => [issue, false])
            ),
            controversies: false,
          },
        },
      ])
    );

    if (
      !profile ||
      !selectedIssues ||
      !Object.values(stands).some((stand) => !!stand) ||
      !controversies.length
    ) {
      return Object.entries(results).map(([id, values]) => ({ id, ...values }));
    }

    results = {
      ...results,
      [profile]: {
        score: results[profile].score + 1,
        selected: {
          ...results[profile].selected,
          profile: true,
        },
      },
    };

    Object.entries(stands).forEach(([issue, stand]) => {
      results = {
        ...results,
        [stand]: {
          score: results[stand].score + 1,
          selected: {
            ...results[stand].selected,
            stands: {
              ...results[stand].selected.stands,
              [issue]: true,
            },
          },
        },
      };
    });

    Object.values(controversies).forEach((controversy) => {
      results = {
        ...results,
        [controversy]: {
          score: results[controversy].score - 1,
          selected: {
            ...results[controversy].selected,
            controversies: true,
          },
        },
      };
    });

    return Object.entries(results)
      .map(([id, values]) => ({ id, ...values }))
      .sort((a, b) => b.score - a.score);
  }
);

export const selectTopResults = createSelector([selectResults], (results) => {
  const candidateScores = results.map(({ id, score }) => ({
    id,
    score: score,
  }));

  const topScore = candidateScores[0].score;
  const topCandidates = candidateScores.filter(
    ({ score }) => score === topScore
  );

  return {
    topCandidates,
    topScore,
  };
});
