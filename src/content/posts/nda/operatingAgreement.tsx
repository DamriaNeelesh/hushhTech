import React from 'react';
import { Box, Heading, Image,Text, VStack, Divider } from '@chakra-ui/react';
import OperatingAgreementImg from '../../../components/images/0_Fund Performance.jpg';

export const frontmatter = {
  title: "Operating Agreement for Hushh Technologies LLC",
  publishedAt: "2025-02-12",
  description: 'Draft Articles of Ownership for Hushh Investments LLC, aligning with U.S. regulations and global market expansion.',
  author: "Internal Team",
  tags: ["operating agreement", "ownership", "compliance", "investment strategy"],
  category: "NDA"
};

const OperatingAgreement: React.FC = () => {
  return (
    <Box color="black" borderRadius="md">
      <Heading as="h2" fontSize="2xl" mb={4} color="black">
        Operating Agreement for Hushh Technologies LLC
      </Heading>

      <Text fontSize="lg" mb={4}>
        Below is a draft Articles of Ownership document tailored for Hushh Investments LLC and its associated entities. This document is designed to align with your compliance goals under U.S. regulations, particularly SEC guidelines, while providing flexibility for expansion into global markets. It incorporates key principles to ensure transparency, operational clarity, and legal adherence.
      </Text>

      <Divider my={4} borderColor="black" />

      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h3" fontSize="lg" color="black">Articles of Ownership</Heading>
          <Text mt={2}><strong>Effective Date:</strong> [Insert Date]</Text>
          <Text><strong>Jurisdiction of Formation:</strong> Delaware, United States (Primary)</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">I. Name and Purpose</Heading>
          <Text mt={2}><strong>Name:</strong></Text>
          <Text>The name of the entity shall be Hushh Investments LLC.</Text>
          <Text mt={2}><strong>Purpose:</strong></Text>
          <Text>Hushh Investments LLC is established to manage investment funds, provide advisory services, and deploy proprietary AI, ML, and data-driven strategies for the benefit of its stakeholders. Its primary goal is to generate alpha while adhering to sustainable and ethical investment practices.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">II. Principal Office</Heading>
          <Text mt={2}>The principal office of Hushh Investments LLC shall be located in Delaware, United States, with additional branches or affiliates established globally as needed for operational or regulatory purposes.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">III. Membership and Ownership Structure</Heading>
          <Text mt={2}><strong>Ownership Classes:</strong></Text>
          <Text>• Class A Members (Founders): Reserved for founding members. Class A shares grant voting rights on all strategic decisions, including capital allocation and major governance changes.</Text>
          <Text>• Class B Members (Investors): Reserved for accredited investors, family offices, and sovereign wealth funds contributing capital. Class B shares grant financial participation without governance voting rights.</Text>
          <Text mt={2}><strong>Membership Units:</strong></Text>
          <Text>Membership units represent ownership interest in the LLC, including profit-sharing rights and obligations. Units are non-transferable without prior written consent from the Managing Members.</Text>
          <Text mt={2}><strong>Management:</strong></Text>
          <Text>The business and affairs of Hushh Investments LLC shall be managed by the Managing Members (Class A). The Managing Members may appoint an Investment Committee and Advisory Board for oversight.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">IV. Entity Structure</Heading>
          <Text mt={2}><strong>Parent Entity:</strong></Text>
          <Text>Hushh Investments LLC (Delaware, USA): Serves as the primary holding company for all subsidiaries.</Text>
          <Text mt={2}><strong>Subsidiaries:</strong></Text>
          <Text>• Hushh Alpha Fund LP: SEC-compliant fund registered under Regulation D, offering investment opportunities to accredited investors.</Text>
          <Text>• Hushh Advisory LLC: Provides investment advisory services under an SEC-registered RIA framework.</Text>
          <Text>• Hushh Labs LLC: Focuses on AI, ML, and data R&D for proprietary investment models.</Text>
          <Text>• Hushh Insurance LLC: Captive insurance entity to manage internal risk and provide tailored coverage for fund operations.</Text>
          <Text mt={2}><strong>Global Affiliates (Proposed):</strong></Text>
          <Text>Establishments in tax-advantaged jurisdictions (e.g., Luxembourg, Singapore, or UAE) to accommodate global family offices and sovereign wealth funds.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">V. Capital Contributions</Heading>
          <Text mt={2}><strong>Initial Contributions:</strong></Text>
          <Text>Founders (Class A Members) shall contribute capital, intellectual property, or services as agreed upon in the Operating Agreement.</Text>
          <Text mt={2}><strong>Subsequent Contributions:</strong></Text>
          <Text>Members may be required to make additional contributions based on the capital needs of the LLC, as determined by the Managing Members.</Text>
          <Text mt={2}><strong>Capital Accounts:</strong></Text>
          <Text>Each member’s contributions shall be recorded in their respective capital accounts, which will reflect their proportional interest in the LLC.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">VI. Allocation of Profits and Losses</Heading>
          <Text mt={2}><strong>Profit Allocation:</strong></Text>
          <Text>Net profits shall be allocated based on membership units, subject to special allocations for Class A Members.</Text>
          <Text mt={2}><strong>Loss Allocation:</strong></Text>
          <Text>Losses shall be allocated similarly to profits unless otherwise decided by the Managing Members.</Text>
          <Text mt={2}><strong>Distribution of Cash Flow:</strong></Text>
          <Text>Distributions shall be made quarterly, with priority given to operational reserves, tax liabilities, and hedging needs.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">VII. Governance</Heading>
          <Text mt={2}><strong>Meetings of Members:</strong></Text>
          <Text>Annual meetings shall be held for strategic planning and performance review.</Text>
          <Text mt={2}><strong>Decision-Making:</strong></Text>
          <Text>Major decisions, including capital raises, acquisitions, and amendments to the Articles of Ownership, require a two-thirds majority vote of Class A Members.</Text>
          <Text mt={2}><strong>Investment Committee:</strong></Text>
          <Text>The Investment Committee shall oversee portfolio strategy, risk management, and compliance with SEC regulations.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">VIII. Compliance and Reporting</Heading>
          <Text mt={2}><strong>Regulatory Compliance:</strong></Text>
          <Text>The LLC and its subsidiaries shall comply with all applicable laws, including SEC, FINRA, and CFTC regulations. Anti-money laundering (AML) and Know Your Customer (KYC) procedures shall be strictly enforced.</Text>
          <Text mt={2}><strong>Annual Reporting:</strong></Text>
          <Text>Audited financial statements shall be provided to all members. Quarterly performance reports shall include risk metrics and compliance updates.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">IX. Risk Management</Heading>
          <Text mt={2}><strong>Hedging Strategy:</strong></Text>
          <Text>The LLC shall implement layered hedging to protect against market downturns (5%, 10%, 25% OTM protection).</Text>
          <Text mt={2}><strong>Leverage Limits:</strong></Text>
          <Text>Margin usage shall not exceed 50% of net asset value, ensuring liquidity and operational stability.</Text>
          <Text mt={2}><strong>Insurance Coverage:</strong></Text>
          <Text>Risk exposure from investments and operations shall be managed by Hushh Insurance LLC.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">X. Dissolution</Heading>
          <Text mt={2}><strong>Voluntary Dissolution:</strong></Text>
          <Text>The LLC may be dissolved upon a unanimous vote of Class A Members.</Text>
          <Text mt={2}><strong>Distribution of Assets:</strong></Text>
          <Text>Upon dissolution, assets shall be liquidated, and proceeds distributed based on capital accounts after settling liabilities.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">XI. Amendments</Heading>
          <Text mt={2}>These Articles of Ownership may be amended only with the written consent of two-thirds of the Class A Members.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">XII. Governing Law</Heading>
          <Text mt={2}>These Articles shall be governed by and construed in accordance with the laws of the State of Delaware, United States.</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Signatures</Heading>
          <Text mt={2}>By signing below, the members agree to the terms set forth in these Articles of Ownership.</Text>
          <Text>Managing Member:</Text>
          <Text>Name:</Text>
          <Text>Date:</Text>
          <Text>Class A Member:</Text>
          <Text>Name:</Text>
          <Text>Date:</Text>
          <Text>Class B Member:</Text>
          <Text>Name:</Text>
          <Text>Date:</Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="black">Free Cash Flow: The King of All Metrics</Heading>
          <Text mt={2}>If you could pick just one number to judge a company by—just one metric to decide whether a business is truly great—what would it be?</Text>
          <Text>Revenue? Too easy to inflate.</Text>
          <Text>Earnings? Too full of accounting tricks.</Text>
          <Text>EBITDA? The CFO’s favorite smokescreen.</Text>
          <Text>The real king is free cash flow (FCF).</Text>
          <Text>FCF is the money that actually makes it into the company’s hands after all the necessary expenses—factories, software, salaries, inventory—have been paid. It’s the cash that’s left over to return to shareholders, reinvest in growth, or simply pile up in the corporate vault like Scrooge McDuck.</Text>
          <Text>For investors, FCF is the ultimate truth serum. If a company generates a lot of FCF, it means it has pricing power, operational efficiency, and a business model that converts revenue into real, hard cash. And when you zoom out, FCF is often the difference between businesses that survive and businesses that thrive.</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default OperatingAgreement;