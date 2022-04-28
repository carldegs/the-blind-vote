import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISSUE_TITLE } from '../constants';
import { Issue } from '../types/Issue';
import { PollState } from '../types/PollState';
import sortByStringProp from '../utils/sortByStringProp';

const initialState: PollState = {
  profile: '',
  selectedIssues: [],
  stands: {} as Record<Issue, string>,
  controversies: [],
  issueIdx: 0,
};

export const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<string>) => {
      state.profile = action.payload;
    },
    toggleSelectedIssues: (state, action: PayloadAction<Issue>) => {
      if (state.selectedIssues.includes(action.payload)) {
        state.selectedIssues = state.selectedIssues.filter(
          (issue) => issue !== action.payload
        );
      } else {
        state.selectedIssues = [...state.selectedIssues, action.payload].sort(
          (a, b) => sortByStringProp(ISSUE_TITLE[a], ISSUE_TITLE[b])
        );
      }
    },
    selectAllIssues: (state) => {
      state.selectedIssues = Object.keys(ISSUE_TITLE).sort((a, b) =>
        sortByStringProp(ISSUE_TITLE[a], ISSUE_TITLE[b])
      ) as unknown as Issue[];
    },
    selectNoneIssues: (state) => {
      state.selectedIssues = [];
    },
    setStand: (
      state,
      action: PayloadAction<{ issue: Issue; candidate: string }>
    ) => {
      state.stands = {
        ...state.stands,
        [action.payload.issue]: action.payload.candidate,
      };
    },
    toggleControversies: (state, action: PayloadAction<string>) => {
      if (state.controversies.includes(action.payload)) {
        state.controversies = state.controversies
          .filter((candidate) => candidate !== action.payload)
          .sort(sortByStringProp);
      } else {
        state.controversies = [...state.controversies, action.payload].sort(
          sortByStringProp
        );
      }
    },
    setNextIssue: (state) => {
      const nextIdx = state.issueIdx + 1;

      if (nextIdx < state.selectedIssues.length) {
        state.issueIdx = nextIdx;
      }
    },
    setPrevIssue: (state) => {
      const prevIdx = state.issueIdx - 1;

      if (prevIdx >= 0) {
        state.issueIdx = prevIdx;
      }
    },
  },
});

export const {
  setProfile,
  toggleSelectedIssues,
  selectAllIssues,
  selectNoneIssues,
  setNextIssue,
  setPrevIssue,
  setStand,
  toggleControversies,
} = pollSlice.actions;

export default pollSlice.reducer;
