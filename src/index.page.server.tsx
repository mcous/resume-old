import { Link } from './link'
import { HorizontalList } from './list'
import { Title } from './title'
import { Job } from './job'
import { Project } from './project'
import { TitledList } from './titled-list'

export const title = "Michael Cousins' Résumé"

export const description =
  "A selection of Michael Cousins' accomplishments and skills"

export function Page(): JSX.Element {
  return (
    <>
      <Link
        href="./michael-cousins.pdf"
        text="right white underline"
        display="block print:hidden"
        p="4"
        m="x-auto"
        max-w="8.5in"
      >
        Download PDF
      </Link>
      <main
        w="8.5in"
        h="11in"
        p="x-10 y-6"
        m="x-auto"
        bg="white"
        text="base"
        flex="~"
      >
        <div
          w="2/3"
          h="full"
          p="r-8"
          m="r-8"
          border="r-1 dark-700"
          flex="shrink-0"
        >
          <section p="b-6" m="b-6" border="b-1 dark-700">
            <Title level="1" text="2xl">
              Michael Cousins
            </Title>
            <HorizontalList m="b-4">
              <span>Brooklyn, NY</span>
              <Link href="mailto:mike@cousins.io">mike@cousins.io</Link>
              <Link href="https://mike.cousins.io">mike.cousins.io</Link>
              <Link href="https://github.com/mcous">github.com/mcous</Link>
            </HorizontalList>
            <p>
              Detail-oriented software engineer and architect with 10 years of
              engineering experience. Passionate about shipping high-quality
              products, leading technical teams to solve complex problems with
              thoughtful solutions, and improving my craft and the craft of
              those around me.
            </p>
          </section>
          <section>
            <Title level="2" text="xl" m="b-2">
              Work Experience
            </Title>
            <Job
              m="b-4"
              name="Opentrons Labworks"
              summary={[
                '5 years',
                'Liquid handling robots for biologists',
                <Link href="https://www.opentrons.com">opentrons.com</Link>,
              ]}
              roles={[
                'Software Engineer IV — Mar. 2019 to present',
                'Software Engineer III — Mar. 2018 to Mar. 2019',
                'Frontend Software Engineer — Aug. 2017 to Mar. 2018',
              ]}
              achievements={[
                <p>
                  Architecting a backend, to be built by a third-party, for
                  sharing scientific protocols and helping biologists address
                  experiment reproducibility problems
                </p>,
                <p>
                  Skilling my teams up on testing best practices, increasing
                  overall speed by decreasing unexpected bugs and time spent in
                  QA
                </p>,
                <p>
                  Designing and managing the implementation of a new execution
                  and control layer of the OT-2's software, unlocking
                  functionality and reliability across the stack, while keeping
                  users' already functioning workflows intact
                </p>,
                <p>
                  Led the Robot Services engineering team as we resolved some of
                  our device's thorniest issues, including networking and
                  timekeeping bugs
                </p>,
                <p>
                  Configured and maintained CI and deployment systems for
                  multiple products across multiple languages, operating
                  systems, and CI providers
                </p>,
                <p>
                  Architected, developed, and maintained the Opentrons App for
                  the release of the OT-2, built using Electron and React
                </p>,
              ]}
            />
            <Job
              m="b-4"
              name="Keen Home"
              summary={[
                '2 ¾ years',
                'Smart, connected HVAC products',
                <Link href="https://keenhome.io">keenhome.io</Link>,
              ]}
              roles={[
                'Senior Product Engineer — Jul. 2015 to Jul. 2017',
                'Mechatronics Engineer — Nov. 2014 to Jul. 2015',
              ]}
              achievements={[
                <p>
                  Rebuilt the Keen Home API's authentication and authorization
                  systems, adding an OAuth frontend and backend for Amazon Alexa
                  integration
                </p>,
                <p>
                  Designed and implemented software for assembly-line QC
                  fixtures, and worked closely with our Shenzhen manufacturer to
                  install and operate the fixtures
                </p>,
                <p>
                  Created and managed Node.js-based production scheduling
                  systems, administrative tools, and automated acceptance tests
                </p>,
                <p>
                  Shipped production Smart Vent firmware on the SiLabs ZigBee
                  stack
                </p>,
              ]}
            />
            <Job
              name="Wiley Cousins"
              summary={[
                '1 year',
                'Contract software & hardware engineering services',
              ]}
              roles={[
                'Co-Founder and Hardware Engineer — Oct. 2013 to Oct. 2014',
              ]}
              achievements={[
                <p>
                  Designed electronics and firmware for hand-crafted home
                  products
                </p>,
                <p>
                  Taught a 12-week "Introduction to Circuits" class designed to
                  take students from no experience to digital logic
                </p>,
              ]}
            />
          </section>
        </div>
        <div w="full">
          <section p="b-6" m="b-6" border="b-1 dark-700">
            <Title level="2" m="t-4 b-2" text="lg">
              Open-Source Projects
            </Title>
            <Project
              m="b-2"
              repository="tracespace/tracespace"
              stats={['TypeScript, JavaScript', 'Jul. 2014 to present']}
            >
              Printed circuit board (Gerber) viewer web-app and libraries.
              Renders CAD fabrication output as SVG. Used by various PCB
              manufacturers.
            </Project>
            <Project
              m="b-2"
              repository="mcous/decoy"
              stats={['Python', 'Nov. 2020 to present']}
            >
              Mocking library that enforces opinionated best practices and
              guides architecture with TDD. Used at Opentrons to test core
              logic.
            </Project>
            <Project
              repository="wileycousins/clockblock"
              stats={[
                'Embedded C++, KiCad, SolidWorks',
                'Sep. 2013 to Sep. 2014',
              ]}
            >
              LED clock embedded in a solid block of wood. Limited run art piece
              made with H. Cole Wiley and James Goedert.
            </Project>
          </section>
          <section p="b-6" m="b-6" border="b-1 dark-700">
            <Title level="2" m="b-2" text="lg">
              Ask Me About
            </Title>
            <TitledList title="Languages" m="b-2">
              <span>TypeScript and JavaScript</span>
              <span>Python</span>
              <span>Scala</span>
            </TitledList>
            <TitledList title="Testing" m="b-2">
              <span>Test-driven development</span>
              <span>Automated acceptance testing</span>
              <span>CI setup and management</span>
            </TitledList>
            <TitledList title="Frontend" m="b-2">
              <span>React and state management</span>
              <span>Constraint-based style systems</span>
              <span>Web and Service Workers</span>
            </TitledList>
            <TitledList title="Backend" m="b-2">
              <span>HTTP API design</span>
              <span>Reliable concurrency</span>
              <span>Service-oriented architecture</span>
            </TitledList>
            <TitledList title="Spicy Takes">
              <span>Promises are better than async/await</span>
              <span>Mocks are great, but never used correctly</span>
              <span>Test-after might be worse than no tests</span>
            </TitledList>
          </section>
          <section>
            <Title level="2" m="b-2" text="lg">
              Education
            </Title>
            <TitledList title="B.Sc. in Mechanical Engineering">
              <span>Northwestern University, class of 2012</span>
              <span>Concentration in intelligent mech. systems</span>
              <span>One-year co-op with Newell Rubbermaid</span>
            </TitledList>
          </section>
        </div>
      </main>
    </>
  )
}
