import { useMemo } from 'react';

import { CANDIDATES } from '../constants';
import { useAppSelector } from './reduxHooks';

const useResults = () => {
  const { profile, selectedIssues, stands, controversies } = useAppSelector(
    ({ poll }) => poll
  );

  const results = useMemo(() => {
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
  }, [controversies, profile, selectedIssues, stands]);

  const { topCandidates, topScore } = useMemo(() => {
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
  }, [results]);

  return { results, topCandidates, topScore };
};

export default useResults;
