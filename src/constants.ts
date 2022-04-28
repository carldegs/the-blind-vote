import CandidatesData from '../public/candidateData.json';
import { Candidate } from './types/Candidate';
import { Issue } from './types/Issue';

export const CANDIDATES = CandidatesData as unknown as Record<
  string,
  Candidate
>;

export const ISSUE_TITLE: Record<Issue, string> = {
  [Issue.Abortion]: 'Abortion',
  [Issue.Divorce]: 'Divorce',
  [Issue.ClimateChange]: 'Climate Change',
  [Issue.COVID19]: 'Responses during COVID-19',
  [Issue.Federalism]: 'Federalism',
  [Issue.PhChina]: 'Philippines-China Relations',
  [Issue.ABSCBN]: 'ABS-CBN Franchise Renewal',
  [Issue.InjusticesByFEM]: 'Injustices by Ferdinand Marcos, Sr.',
  [Issue.WarOnDrugs]: 'War on Drugs',
  [Issue.DeathPenalty]: 'Death Penalty',
};
