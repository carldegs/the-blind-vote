import { Alignment } from './Alignment';
import { Issue } from './Issue';

export interface Candidate {
  id: string;
  name: string;
  ballotNumber: number;
  personalProfile: string[];
  governmentProfile: string[];
  stands: Record<
    Issue,
    {
      alignment: Alignment;
      statement: string;
    }
  >;
  controversies: string[];
}
