import { Issue } from './Issue';

export interface PollState {
  profile: string;
  selectedIssues: Issue[];
  stands: Record<Issue, string>;
  controversies: string[];
  issueIdx: number;
}
