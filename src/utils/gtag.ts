import { Issue } from '../types/Issue';

export const GTAG_EVENTS = {
  openVideo: 'open_video',
  openReccreate: 'open_reccreate',
  openLinkedIn: 'open_linkedin',
  shareResults: (type: 'twitter' | 'fb' | 'copy') => `share_${type}`,
  select: (type: Issue | string, candidate: string) =>
    `select_${type}_${candidate}`,
  clickLandingCTA: 'click_landing_cta',
  clickStartQuiz: 'click_start_quiz',
  clickLearnMore: 'click_learn_more',
};

export const sendPageViewEvent = (url: string): void => {
  (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const sendEvent = (action: string): void => {
  (window as any).gtag('event', action, {
    send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  });
};
