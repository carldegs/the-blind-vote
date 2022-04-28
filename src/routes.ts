import { Issue } from './types/Issue';

export const ISSUE_ROUTES = {
  [Issue.Abortion]: 'abortion',
  [Issue.Divorce]: 'divorce',
  [Issue.ClimateChange]: 'climate-change',
  [Issue.COVID19]: 'covid19',
  [Issue.Federalism]: 'federalism',
  [Issue.PhChina]: 'ph-china',
  [Issue.ABSCBN]: 'abs-cbn',
  [Issue.InjusticesByFEM]: 'injustices-by-fem',
  [Issue.WarOnDrugs]: 'war-on-drugs',
  [Issue.DeathPenalty]: 'death-penalty',
};

export const ROUTES = {
  home: '/',
  about: '/about',
  profile: '/profile',
  issue: '/issues',
  // issue: (issue: Issue) => `/issues/${ISSUE_ROUTES[issue]}`,
  selectIssues: '/issues/select',
  intro: '/intro',
  controversies: '/controversies',
  results: '/results',
  404: '/404',
};
