import { Button, Heading, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'phosphor-react';

import QuizLayout, {
  QuizLayoutContent,
  QuizLayoutHeader,
} from '../layouts/QuizLayout';

const PrivacyPolicy: React.FC = () => {
  const router = useRouter();
  return (
    <QuizLayout center={false}>
      <QuizLayoutHeader fontSize="3xl">
        <Button
          colorScheme="purple"
          leftIcon={<ArrowLeft weight="duotone" />}
          size="sm"
          variant="ghost"
          ml={-4}
          onClick={() => {
            router.back();
          }}
        >
          BACK
        </Button>
        <Heading>Privacy Policy</Heading>
      </QuizLayoutHeader>
      <QuizLayoutContent maxW="container.lg" mx="auto">
        <Stack spacing={2} mt={6}>
          <p>
            At The Blind Test, accessible from{' '}
            <a href="https://blindtest.carldegs.com/">
              https://blindtest.carldegs.com/
            </a>
            , one of our main priorities is the privacy of our visitors. This
            Privacy Policy document contains types of information that is
            collected and recorded by The Blind Test and how we use it.
          </p>

          <p>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us. Our Privacy
            Policy was generated with the help of{' '}
            <a href="https://www.gdprprivacynotice.com/">
              GDPR Privacy Policy Generator from GDPRPrivacyNotice.com
            </a>
          </p>

          <Heading fontSize="lg" pt={6}>
            General Data Protection Regulation (GDPR)
          </Heading>
          <p>We are a Data Controller of your information.</p>

          <p>
            The Blind Test legal basis for collecting and using the personal
            information described in this Privacy Policy depends on the Personal
            Information we collect and the specific context in which we collect
            the information:
          </p>
          <ul style={{ paddingLeft: '36px' }}>
            <li>The Blind Test needs to perform a contract with you</li>
            <li>You have given The Blind Test permission to do so</li>
            <li>
              Processing your personal information is in The Blind Test
              legitimate interests
            </li>
            <li>The Blind Test needs to comply with the law</li>
          </ul>

          <p>
            The Blind Test will retain your personal information only for as
            long as is necessary for the purposes set out in this Privacy
            Policy. We will retain and use your information to the extent
            necessary to comply with our legal obligations, resolve disputes,
            and enforce our policies.
          </p>

          <p>
            If you are a resident of the European Economic Area (EEA), you have
            certain data protection rights. If you wish to be informed what
            Personal Information we hold about you and if you want it to be
            removed from our systems, please contact us.
          </p>
          <p>
            In certain circumstances, you have the following data protection
            rights:
          </p>
          <ul style={{ paddingLeft: '36px' }}>
            <li>
              The right to access, update or to delete the information we have
              on you.
            </li>
            <li>The right of rectification.</li>
            <li>The right to object.</li>
            <li>The right of restriction.</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>

          <Heading fontSize="lg" pt={6}>
            Log Files
          </Heading>

          <p>
            The Blind Test follows a standard procedure of using log files.
            These files log visitors when they visit websites. All hosting
            companies do this and a part of hosting services&apos; analytics.
            The information collected by log files include internet protocol
            (IP) addresses, browser type, Internet Service Provider (ISP), date
            and time stamp, referring/exit pages, and possibly the number of
            clicks. These are not linked to any information that is personally
            identifiable. The purpose of the information is for analyzing
            trends, administering the site, tracking users&apos; movement on the
            website, and gathering demographic information.
          </p>

          <Heading fontSize="lg" pt={6}>
            Google DoubleClick DART Cookie
          </Heading>

          <p>
            Google is one of a third-party vendor on our site. It also uses
            cookies, known as DART cookies, to serve ads to our site visitors
            based upon their visit to www.website.com and other sites on the
            internet. However, visitors may choose to decline the use of DART
            cookies by visiting the Google ad and content network Privacy Policy
            at the following URL –{' '}
            <a href="https://policies.google.com/technologies/ads">
              https://policies.google.com/technologies/ads
            </a>
          </p>

          <Heading fontSize="lg" pt={6}>
            Privacy Policies
          </Heading>

          <p>
            You may consult this list to find the Privacy Policy for each of the
            advertising partners of The Blind Test.
          </p>

          <p>
            Third-party ad servers or ad networks uses technologies like
            cookies, JavaScript, or Web Beacons that are used in their
            respective advertisements and links that appear on The Blind Test,
            which are sent directly to users&apos; browser. They automatically
            receive your IP address when this occurs. These technologies are
            used to measure the effectiveness of their advertising campaigns
            and/or to personalize the advertising content that you see on
            websites that you visit.
          </p>

          <p>
            Note that The Blind Test has no access to or control over these
            cookies that are used by third-party advertisers.
          </p>

          <Heading fontSize="lg" pt={6}>
            Third Party Privacy Policies
          </Heading>

          <p>
            The Blind Test&apos;s Privacy Policy does not apply to other
            advertisers or websites. Thus, we are advising you to consult the
            respective Privacy Policies of these third-party ad servers for more
            detailed information. It may include their practices and
            instructions about how to opt-out of certain options.{' '}
          </p>

          <p>
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers&apos;
            respective websites.
          </p>

          <Heading fontSize="lg" pt={6}>
            Children&apos;s Information
          </Heading>

          <p>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
          </p>

          <p>
            The Blind Test does not knowingly collect any Personal Identifiable
            Information from children under the age of 13. If you think that
            your child provided this kind of information on our website, we
            strongly encourage you to contact us immediately and we will do our
            best efforts to promptly remove such information from our records.
          </p>

          <Heading fontSize="lg" pt={6}>
            Online Privacy Policy Only
          </Heading>

          <p>
            Our Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in The Blind Test. This policy is
            not applicable to any information collected offline or via channels
            other than this website.
          </p>

          <Heading fontSize="lg" pt={6}>
            Consent
          </Heading>

          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>
        </Stack>
      </QuizLayoutContent>
    </QuizLayout>
  );
};

export default PrivacyPolicy;
