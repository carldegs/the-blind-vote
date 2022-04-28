import { promises as fs } from 'fs';

enum Alignment {
  Agree,
  Neutral,
  Disagree,
  NoStatement,
}

enum Issue {
  Abortion,
  Divorce,
  ClimateChange,
  COVID19,
  Federalism,
  PhChina,
  ABSCBN,
  InjusticesByFEM,
  WarOnDrugs,
  DeathPenalty,
}

interface Candidate {
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

const NAMES = `Ernesto Abella
Leody de Guzman
Isko Moreno Domagoso
Norberto Gonzales
Ping Lacson
Faisal Mangondato
Ferdinand “Bongbong” Marcos Jr.
Jose Montemayor Jr.
Manny Pacquiao
Leni Robredo
`;

const PERSONAL_PROFILES = `Was a Christian pastor
Was CEO of different businesses
Was a columnist for newspapers
Taught at a university
///
Member and leader of pro-labor organizations
Was Vice President of a bank and finance union
///
Was in the entertainment industry
///
Graduated from a pre-medicine course at a top university in Davao
///
Has a masters degree in Government Management
Has an honorary degree in law
///
Is a businessman
///
Likes pop culture
///
Is a lawyer and cardiologist at major hospitals
Was a lecturer at multiple schools and universities
Was a consultant for different medical centers
Published books about law, medicine, and economics
///
Was in the sports industry
Was a church preacher
///
Is a public attorney
Has three honorary degrees in public administration, humanities and in law`;

const GOVERNMENT_PROFILES = `Was an Undersecretary of strategic communications and research for foreign affairs
Was a Presidential Spokesperson
///
Ran in previous electoral bids but lost
///
Was elected multiple times to top positions for a city
Was an Undersecretary of a social welfare and development department
///
Held a senior position in peace talk negotiations in Mindanao
Was a presidential advisor for special concerns and other affairs
Was a national security advisor and defense chief
///
Has worked for the government for a long time
Headed rehab efforts for those affected with Typhoon Yolanda
Worked in multiple task forces
///
Ran in previous electoral bids but lost
///
Held high positions at a province in his early 20s
Co-wrote laws on cybercrime, anti-drinking and driving, and child protection
Head author of a balanced housing law as a senator
///
Ran for governor but lost
///
Co-wrote laws on urban development, bayanihan, and religion
Wrote a law about OFWs
///
Wrote laws on economic and financial literacy, tax incentives, and management
Known for leading relief operations and response initiatives
Held a top position in the government`;

const STANDS = {
  [Issue.Abortion]: `2
  Only in times of "real need" and with limits.
  ///
  0
  Women should decide for their own bodies.
  ///
  2
  No one has a right to take life away. The child is innocent.
  ///
  3
  No answer.
  ///
  1
  We need to study these issues more and consult with experts
  ///
  3
  No answer.
  ///
  0
  Yes to abortion, for those in extreme cases
  ///
  2
  No one has a right to take life away. The child is innocent.
  ///
  2
  No one has a right to take life away. The child is innocent.
  ///
  2
  No to abortion, but open to decriminalizing abortion for those in extreme situations.
  `,
  [Issue.Divorce]: `1
  Divorce should be more of protection for those threatened (wife, kids)
  ///
  0
  Like any other contract, people of age can do this. And they can also decide to end the contract.
  ///
  0
  Yes.
  ///
  3
  No answer.
  ///
  0
  Can apply for divorce only once in your life.
  ///
  0
  Only if you're toxic already with each other
  ///
  1
  Sometimes it's needed, but I don't want to encourage it
  ///
  2
  No.
  ///
  2
  God joined you together.
  ///
  2
  No to divorce, but we need to protect the victims through economic empowerment.
  `,
  [Issue.ClimateChange]: `3
  "...While we pursue economic development programs, we aspire for sustainable, climate-change resilient living."
  ///
  3
  "Dapat ang mundo ay magkaisa laban sa global warming. Kailangan natin ng isang independent foreign policy. More on economic and climate ang ating pagkakasunduan."
  ///
  3
  "I will adopt what Germany and Netherlands is doing right now, agrovoltaic system which is two-pronged -- You produce food, you produce energy."
  ///
  3
  "Nagbabago ang klima ng mundo. There's nothing much we can do about it... I'm a little disappointed our scientists are telling me the truth of the matter, they really don't know."
  ///
  3
  "No nation can do it alone. It is time for the community of nations to really take this issue very seriously."
  ///
  3
  No statement available.
  ///
  3
  "Ang dala ng Climate Change ay ang malakas na hangin sa mga bagyo, mas tuyo kapag tag-init. Ito ay isang katotohanan na hindi maaring tayo ay pikit mata na lamang. Kailangan na may gagawin tayo."
  ///
  3
  No statement available.
  ///
  3
  "Magtulong-tulong tayo upang maging malinis ang ating kapaligiran. Ipagpatuloy natin ang pagiging plantita at plantito. Magtanim tayo ng mga puno sa halip na ubusin ang oras sa mga bisyo."
  ///
  3
  "Yung climate change talaga ang kailangan nating seryosohin, kasi actually itong mga sakunang dumadaan sa atin ngayon pagrabe nang pagrabe."
  `,
  [Issue.ABSCBN]: `3
  No statement available
  ///
  0
  "Sa halip na ang gobyerno ay humakbang para ampatin ang epekto ng pandemya sa unemployment, naging bahagi pa siya sa pagpaparami ng mga walang trabaho sa bansa..."
  ///
  1
  "I made it clear: rule of law. If Congress gives you such privilege and approves it, I will sign it."
  ///
  3
  No statement available
  ///
  0
  Said a message of hope to ABS-CBN: "You fall today, you will rise tomorrow, and that's for sure it is as simple as that."
  ///
  3
  No statement available
  ///
  1
  "If ABS-CBN could take care of all these problems as highlighted by the House committee, why not apply for a franchise?"
  ///
  3
  No statement available
  ///
  0
  "I'm hoping, I'm praying na hipuin ng Panginoon ang Pangulo na tulungan at kausapin ang NTC na bigyan ng provisional authority to operate while the pending renewal bill is dinidinig ng lower House at Senate."
  ///
  0
  "Supportive ako, at tingin ko iyon iyong tamang paraan, iyong paghain ni Senator Tito Sotto saka ni Congresswoman Vilma Santos-Recto ng pag-approve ng panibagong franchise para sa ABS-CBN."
  `,
  [Issue.WarOnDrugs]: `0
  "There's been a misunderstanding on what we're doing. They are open to present their own criticisms, but we'll continue to pursue our own line of action."
  ///
  2
  "Drug addiction must be treated as a complex disease and must therefore be treated scientifically through rehabilitation"
  ///
  0
  "As long as there is search warrant and warrant of arrest. Under the law, you can do that any time of the day. As I have said, tuloy ang war on drugs. Tapos kikilalanin natin yung mga batas na umiiral at yun ang ipapatupad natin."
  ///
  2
  "You know, there was a golden opportunity that happened during the early days of this so-called drug war. I'm not saying that it's a good approach... It was a horrible approach that you start killing people in the communities."
  ///
  1
  "Dapat nagsucceed (yung war on drugs ni Duterte) kung tama yung implementasyon without having to resort to EJK. Pero along the way, nakita natin na hindi lamang isa yung standard."
  ///
  0
  "Kailangan litisin yung mga pusher... within the due process of the law. Kung ito'y talagang magiging cancer na ng society, diyan pwedeng patawan ng malaking parusa."
  ///
  2
  "Kailangan din natin tignan yung prevention, na tinuturuan natin 'yung mga bata na huwag kayong papasok diyan... At 'yung mga nasabit na o 'yung mga naadik na, may maganda tayong mga rehab center para matulungan natin sila."
  ///
  2
  "Are we going to resort to extreme measures like tokhang? EJK? Hindi naman po kailangan. If we have God in our needs, masosolve natin yan. Nahuhuli yung drug lord, wala eh, pinapatakas."
  ///
  0
  "Si President at kapulisan natin ay ayaw nila lumabag sa batas. Sinusunod nila ang due process. Alam niyo, may ibang mga drug lord pinapatay na rin nila yung mga tao nila dahil baka magsumbong. Yun ang nangyayari."
  ///
  2
  "Very clearly, based on official data, despite the killings of Filipinos and all the money spent, the amount of shabu and drug money we've seized has not gone beyond 1% of those in circulation."
  `,
  [Issue.PhChina]: `0
  "This is... an assertion that we are an independent and sovereign nation, now finding common ground with friendly neighbors..."
  ///
  2
  "We need to be vigilant against China's threats on our territory. Relying on US military intervention is not the solution."
  ///
  0
  "Filipino first is my standard. What benefits will the PH and its citizens have? If we would join, sign contract, etc... Filipinos should always benefit."
  ///
  3
  No data available.
  ///
  2
  "Maybe a review of the country's diplomatic relations is timely and called for."
  ///
  3
  No data available.
  ///
  0
  Agree.
  ///
  3
  No data available.
  ///
  2
  "Wag tayong, hindi naman tayo basta-basta rin na magpapabully lang ganyan, eh gusto nating kaibigan sa lahat ng mga bansa."
  ///
  0
  "We don't need to wage war. What we need to do is to enter into alliances with traditional and emerging partners."
  `,
  [Issue.InjusticesByFEM]: `3
  No data available.
  ///
  3
  Wants to facilitate the exhumation of remains of Ferdinand Marcos at the Libingan ng mga Bayani.
  ///
  3
  "Kung meron silang kaso, we as a state must... give justice to the victims. Dapat managot yung dapat managot sa ilalim ng batas."
  ///
  3
  "...Anong ginawa niya? Nag-declare ng Marial Law. And before we know it, the nation was under a dictatorship."
  ///
  3
  "Martial Law was declared for many good reasons. At least from the peace and order perspective. Everything that followed was wrong. Since 1986, it has been the same all over again. When will we ever learn?"
  ///
  3
  No data available.
  ///
  3
  "Essentially you are teaching the children lies. There was no evidence."
  ///
  3
  No data available.
  ///
  3
  "...Kung nagkamali ka, dapat marunong ka humingi ng patawad."
  ///
  3
  "Kapag nanahimik tayo... pera at kapangyarihan ang magdidikta ng kasaysayan."`,
  [Issue.COVID19]: `3
  No data available.
  ///
  3
  No data available.
  ///
  3
  Administered 374k boosters as of Feb 2022. Hired tricycle drivers who lost livelihood during the pandemic as service riders. Opened 2 RT-PCR labs in a hospital. Established quarantine facilities and a field hospital.
  ///
  3
  No data available.
  ///
  3
  Lobbied for emergency employment and food terminal programs for jobless and hungry. Voted to approve COVID-19 Vacinnation Program Act.
  ///
  3
  No data available.
  ///
  3
  Donated 13k rapid antibody test kits to Quezon City. Donated PPEs to hospitals. Donated face shields to NCR Police Office.
  ///
  3
  No data available.
  ///
  3
  Donated 5 buses to MMDA. Donated 50k test kits. Donated 600k face masks.
  ///
  3
  Opened free dorms for frontliners. Distributed PPEs, food and care packages. Free shuttle service for frontliners. Distributed free antigen kits worth 11M. Had a "vaccination express" program.
  `,
  [Issue.DeathPenalty]: `0
  For drug-related crimes, heinous crimes
  ///
  2
  As long as there is poverty, crimes are inevitable. Government should focus on eradicating poverty to eradicate heinous crimes so that we won't need the death penalty.
  ///
  2
  Our judicial system is flawed at the moment.
  ///
  2
  Life is sacred.
  ///
  2
  No to death penalty even though this person co-wrote bills pushing for the death penalty. A movie changed this person's mind.
  ///
  0
  The punishment should fit the crime.
  ///
  1
  Not sure if it's effective. Thinks enforcement is much more important than the actual punishment.
  ///
  3
  No data available.
  ///
  0
  Death penalty is not illegal and does not go against the government, nor the eyes of God.
  ///
  2
  The death penalty will not prevent other crimes to be committed.`,
  [Issue.Federalism]: `3
  No data available.
  ///
  2
  "These are problems created by the very same leaders, from political dynasties, that promise these fake solutions."
  ///
  2
  Disagree.
  ///
  2
  "No for the PH, but yes for the whole ASEAN." Wants to try autonomy for all regions first."
  ///
  2
  Proposes an alternative to federalism without having to amend the Constitution.
  ///
  0
  Wants to bring governance closer to the masses and build better programs for agriculture, industries, and healthcare.
  ///
  1
  "If the people agree on it, then that's what we'll do. We will explain what's good and what's bad with this system, and let the people decide."
  ///
  3
  No data available.
  ///
  0
  Hopes that this will discipline corrupt people. Wants to push for local autonomy.
  ///
  1
  Advocates for more balanced discussions.`,
};

const CONTROVERSIES = `N/A
///
N/A
///
ARRESTED due to alleged bingo operations held in a public place but charges were DISMISSED due to lack of evidence.
///
Was CHARGED with misuse of 96M worth of government funds, still a PENDING CASE.
Was IMPLICATED in a case of contempt by the Supreme Court.
///
FILED with murder charges, but DISMISSED for lack of probable cause.
///
N/A
///
Has numerous ill-gotten wealth cases.
CONVICTED as a tax evader in 9 cases.
Was LINKED to Janet Napoles' pork barrel scam.
///
N/A
///
N/A
///
ACCUSED of rigging the election by the opposition but was ACQUITTED UNANIMOUSLY by the Supreme Court due to lack of merit.`;

const createId = () => Math.random().toString(36).slice(2);
const parseProfile = (str: string) => {
  const profiles = str.split('\n///\n');

  return profiles.map((profile) => profile.split('\n'));
};
const parseStands = (standObj: Record<Issue, string>) =>
  Object.entries(standObj).map(([issue, standStr]) => {
    const candidateStands = standStr
      .split('\n  ///\n  ')
      .map((candStand) => candStand.split('\n  ').filter((cs) => !!cs));

    return [
      issue,
      candidateStands.map(([alignment, statement]) => ({
        alignment: Number(alignment),
        statement,
      })),
    ];
  });
const personalProfiles = parseProfile(PERSONAL_PROFILES);
const governmentProfiles = parseProfile(GOVERNMENT_PROFILES);
const stands = parseStands(STANDS);
const controversies = parseProfile(CONTROVERSIES);
const candidatesArr: Candidate[] = NAMES.split('\n')
  .filter((name) => !!name)
  .map((name, i) => ({
    id: createId(),
    name,
    ballotNumber: i + 1,
    personalProfile: personalProfiles[i],
    governmentProfile: governmentProfiles[i],
    stands: Object.fromEntries(
      stands.map(([issue, stands]) => [issue, stands[i]])
    ),
    controversies: controversies[i].filter(
      (controversy) => controversy !== 'N/A'
    ),
  }));
const candidates = Object.fromEntries(
  candidatesArr.map((candidateData) => [candidateData.id, candidateData])
);

const saveFile = async () => {
  await fs.writeFile('public/candidateData.json', JSON.stringify(candidates), {
    flag: 'w',
  });
  // eslint-disable-next-line no-console
  console.log('File saved.');
};

saveFile();

export default candidates;
