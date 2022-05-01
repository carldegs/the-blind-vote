import CandidatesData from '../public/candidateData.json';
import { Candidate } from './types/Candidate';
import { Issue } from './types/Issue';

export const CANDIDATES = CandidatesData as unknown as Record<
  string,
  Candidate
>;

export const CANDIDATE_URL = 'https://votepilipinas.com/candidate';

export const REFERENCES = [
  {
    title: 'E-Boto PH (2022). Candidates’ Stand on Issues.',
    link: 'https://eboto.ph/candidates/stand_on_issues',
  },
  {
    title: 'Vote Pilipinas (2020). Presidential Candidates.',
    link: 'https://votepilipinas.com/candidates-president.html',
  },
];

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

export const ISSUE_BLURB: Record<Issue, string> = {
  [Issue.Abortion]:
    'Being one of the more sensitive issues in the Philippines, abortion has long been rejected in our country. Pick the statement that best suits your view on the matter.',
  [Issue.Divorce]:
    'Divorce has long been not allowed in our country primarily due to the religious ties of marriage. However, its absence in our laws has historically put legal strains on marriages that no longer work. Pick the statement that best suits your view on the matter.',
  [Issue.ClimateChange]:
    'Global efforts to reduce environmental impacts caused by human operations are becoming more and more important as the effects of climate change become more apparent each year. The next President may provide a platform as to how the Philippines should respond to this issue. Pick the statement that best suits your view on the matter.',
  [Issue.COVID19]:
    'COVID-19 and the pandemic have not just taken many lives, but derailed many of our society’s systems. The responses of the Candidates during these trying times could be a good indicator of the kind of governance they may provide. Pick the statement that best suits your view on the matter.',
  [Issue.Federalism]:
    'Federalism, in a nutshell, divides a country’s political system to two levels: a central government and the many regions/states of a country. If adopted, this has major effects in the way our politics work as different regions, provinces, or states may have different policies or laws suited to them. Pick the statement that best suits your view on the matter.',
  [Issue.PhChina]:
    'China stands as a superpower not just in the Asian landscape, but to the entire world. However, people’s opinions are divided on whether or not promoting such relations is truly beneficial to our country. Pick the statement that best suits your view on the matter.',
  [Issue.ABSCBN]:
    'The recent shutdown of ABS-CBN is still one of the most eyed controversies as the network’s return through a franchise renewal might be addressed by the next President. Pick the statement that best suits your view on the matter.',
  [Issue.InjusticesByFEM]:
    'Historical evidence shows that Ferdinand Marcos, Sr., committed many criminal offenses and injustices to the Philippines. Pick the statement that best suits your view on the matter.',
  [Issue.WarOnDrugs]:
    'Drugs and drug addiction can destroy lives, but is violence the only answer to eradicating the problem? Pick the statement that best suits your view on the matter.',
  [Issue.DeathPenalty]:
    'Death Penalty has come and gone in our laws due to its highly sensitive nature. Crime should be punished, but is death the only solution? Pick the statement that best suits your view on the matter.',
};
