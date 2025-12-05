import React from 'react';
import { Box, Divider, Text, VStack, Heading, Icon, HStack } from '@chakra-ui/react';
import { FiCheckSquare } from 'react-icons/fi';

const aiInfrastructure = () => {
  return (
    <Box fontFamily="'Inter', sans-serif" color={'black'} maxW="4xl" mx="auto" p={5}>
      <Heading as="h1" fontSize={{md:"2xl",base:'xl'}} fontWeight="500" mb={6} textAlign="center">
        AI Infrastructure Thesis Update – May 2025
      </Heading>
      <Text fontWeight="500" fontSize={{md:"xl",base:'lg'}} textAlign="center" mb={2}>
        (Post-Nvidia Q1 FY2026 Earnings)
      </Text>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        Executive Summary
      </Heading>
      <Text mb={4} fontSize={{md:'md',base:'sm'}}>
        Nvidia's Q1 FY2026 results underscore an unprecedented surge in AI infrastructure demand, prompting a thesis upgrade. The company posted $44.1 billion in revenue (+69% YoY) with Data Center sales up 73%, far exceeding expectations despite a one-time China export charge. Gross margins would have been ~71.3% absent the $4.5 billion inventory writedown related to new U.S. export controls. Management issued robust guidance for Q2 FY2026 revenue of ~$45 billion (±2%), even after factoring in an ~$8 billion hit from lost China H20 chip sales. CEO Jensen Huang affirmed that "global demand for AI infrastructure is incredibly strong," noting AI inference workloads have risen 10× in one year, and likening AI to essential infrastructure "just like electricity and the internet".
      </Text>
      <Text mb={6} fontSize={{md:'md',base:'sm'}}>
        Portfolio Implication: Nvidia's blowout quarter confirms our high-conviction view on AI infrastructure as a secular growth engine. We are updating our investment framework accordingly: doubling down on "Ace" compounders at the core of AI compute, refining exposure to "King" enablers that offer near-term income and stability, and selectively advancing emerging "Queen" plays poised to benefit from the AI build-out. We also revise fair value estimates upward for key holdings, reflecting stronger free cash flow (FCF) trajectories and earnings read-throughs from Nvidia's report. Our tactical allocation tilts toward long-term FCF compounding while capturing near-term income via high-quality dividend-payers in the AI ecosystem.
      </Text>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        Nvidia Q1 FY2026 – Key Earnings Highlights
      </Heading>
      
      <VStack align="start" spacing={6} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Record AI-Driven Growth:</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Nvidia's Q1 revenue reached $44.06B (vs. $26.0B in Q1 last year), with Data Center revenue at $39.1B (+73% YoY) dominating the mix. This was driven by exploding demand for GPU compute to train and increasingly infer large AI models. Notably, the new Blackwell GPU ramp is the fastest in company history, contributing ~70% of data center compute sales. Gaming also posted a record $3.8B (+42% YoY) as Nvidia launched its RTX 50-series GPUs with AI features. Smaller segments rebounded – e.g. Professional Visualization $509M (+19%) and Automotive $567M (+72%) on autonomous driving wins.
          </Text>
        </Box>
        
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>China Export Impact and Margins:</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            On April 9, the U.S. government extended export license requirements to Nvidia's China-only H20 chips. In response, Nvidia took a $4.5B charge for H20 inventory and purchase obligations, reducing Q1 GAAP gross margin to 60.5%. Excluding this charge, non-GAAP gross margin was ~71%. The company also disclosed it "was unable to ship" an additional $2.5B of H20 orders in Q1 due to the new rules. Looking ahead, Q2 guidance assumes a further ~$8B loss of China revenue, yet still calls for $45B in sales (~0% QoQ growth ex-China) with 72% gross margin. Nvidia is effectively filling the China gap with surging orders elsewhere – a testament to extraordinary underlying demand. CFO Colette Kress noted customer order commitments remain "firm" even as supply tightens.
          </Text>
        </Box>
        
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Cash Flow and Capital Return:</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Nvidia's AI leadership is translating into prodigious cash generation. Q1 operating cash flow was $27.4B, up ~80% YoY, and free cash flow hit $26.1B in one quarter. Trailing-twelve-month FCF now approximates $72B, implying a modest ~2% FCF yield on the current market cap – rich, but supported by exceptional growth. The company continues to return cash via a token dividend ($0.01/share) and likely share buybacks (Nvidia spent $15.5B on buybacks/return in Q1) as it balances capital needs for supply chain expansion.
          </Text>
        </Box>
        
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>AI Demand & Supply Insights:</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Nvidia's earnings call reinforced that we are in a super-cycle of AI infrastructure investment. "Inference is exploding," said Huang, adding that the new Blackwell platform is designed to "power the full AI lifecycle" from model training to deployment. Importantly, management indicated no demand let-up: "every country needs to build out its AI infrastructure", and Nvidia is increasing its supply capacity – "building it here on shore, United States" – to meet orders that exceed even GTC conference levels. In Huang's words, "we would like to serve all of [the demand], and I think we're on track to serve most of it." This suggests Nvidia is aggressively ramping production (with foundry partner TSMC and in-house packaging) and could continue delivering upside surprises on volumes, albeit with supply still the gating factor in the near term.
          </Text>
        </Box>
        
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Strategic and Geopolitical Notes:</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            On export controls, Huang issued unusually frank commentary: "Export controls should strengthen U.S. platforms, not drive half of the world's AI talent to rivals." He emphasized that China – one of the world's largest AI markets – will "move on with or without Nvidia's chips," and warned that ceding that market could undermine U.S. tech leadership. Nvidia sees the China gap as temporary and is already innovating within U.S. rules (though "it's pretty much impossible to reduce [Hopper] any further" for compliance). The company's stance implies it will advocate for balanced policies while focusing on other global demand ("the platform that wins China is positioned to lead globally"). We will monitor this issue, but current guidance suggests minimal broader impact – excluding China, Nvidia's core AI business is growing explosively and remains capacity-constrained rather than demand-constrained.
          </Text>
        </Box>
        
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Bottom Line:</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Nvidia's results bolster our thesis that AI "mega-capex" cycles are underway across cloud and enterprise. The company's data center backlog and commentary on "tenfold" growth in AI workload metrics signal that today's $40B+ quarterly run-rate is only the beginning if AI adoption continues to scale. We anticipate Nvidia will continue to benefit disproportionately as "AI factories" – essentially next-generation data centers for model training and inference – are built out globally. This quarter, management explicitly cited that countries view AI infrastructure as critical, an assertion that reinforces our long-term demand estimates. Nvidia remains the de facto arms supplier of this boom, and its ability to convert this demand into cash flow and profit (71–75% margin profile) is virtually unparalleled. We maintain Nvidia as a core "Ace" holding and raise our fair value range (see below) accordingly.
          </Text>
        </Box>
      </VStack>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        AI Infrastructure Ecosystem – Earnings Readthroughs & Strategic Updates
      </Heading>
      <Text mb={4} fontSize={{md:'md',base:'sm'}}>
        Nvidia's blowout quarter carries significant readthroughs for the broader AI infrastructure stack, informing our positioning in key partner companies:
      </Text>
      
      <Heading as="h3" fontSize={{md:"lg",base:'md'}} fontWeight="500" mb={4}>
        Compute Suppliers (Silicon & Foundry): AMD and TSMC
      </Heading>
      
      <VStack align="start" spacing={6} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>AMD (Compute Accelerators & CPUs):</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Nvidia's dominance highlights that challengers have much ground to cover. AMD reported Data Center segment revenue of $3.7B (+57% YoY) last quarter, buoyed mainly by EPYC server CPU gains. This is impressive, yet remains an order of magnitude smaller than Nvidia's AI-driven data center sales. AMD's upcoming MI300 accelerators (sampling in H2'25) are its bid to catch up in AI GPUs. We view AMD as a beneficiary of overall compute demand (its CPU business is thriving on cloud adoption), but in the AI accelerator niche the Nvidia lead – and ecosystems like CUDA – will be hard to dislodge. Nvidia's comments that it can supply "most" of the world's inference need suggest limited near-term opening for competitors. We continue to hold AMD as an innovator (Queen) with optionality in AI, but our allocation reflects its second-tier status in acceleration. Any share gains by AMD (or others like Intel's Habana) will likely occur at the margins of an expanding market rather than at Nvidia's expense in the foreseeable future.
          </Text>
        </Box>
        
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>TSMC (Semiconductor Foundry):</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Taiwan Semiconductor Manufacturing Co. remains a critical "pick-and-shovel" play on AI. Nvidia's GPUs (including Blackwell) are fabbed by TSMC, and the surge in Nvidia's orders directly benefits TSMC's HPC chip revenue. TSMC's 2025–2026 capacity plans (especially at advanced nodes and CoWoS packaging for AI chips) were geared for exactly this kind of wave. We note that TSMC's overall business had moderated in late 2024 due to smartphone weakness, but AI demand is now a pivotal tailwind. Per management disclosures, high-performance computing is approaching ~45% of TSMC's sales and growing, offsetting electronics cyclicality. We expect upside to TSMC's 2H25 and 2026 outlook as Nvidia and others (including AMD's MI300 and any custom ASICs) drive wafer volumes. Strategically, Nvidia's effort to "build out supply chain in the US" could eventually involve TSMC's new Arizona fabs (by 2025-26) or U.S. packaging facilities – a dynamic to watch for potential shifts in cost or capacity. We classify TSMC as a solid "King" in our framework – a stable, indispensable infrastructure enabler. Its valuation (~15× forward earnings, ~1.5% dividend yield) remains undemanding given its moat; we are comfortable accumulating TSMC for income and steady compounding as AI silicon demand accelerates.
          </Text>
        </Box>
      </VStack>
      
      <Heading as="h3" fontSize={{md:"lg",base:'md'}} fontWeight="500" mb={4}>
        Power & Cooling Infrastructure: Vertiv and Eaton
      </Heading>
      
      <VStack align="start" spacing={6} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Vertiv (Data Center Power & Cooling):</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Vertiv's Q1 results and guidance underscore its emergence as a pure-play beneficiary of AI data center construction. The company noted "robust momentum… strong AI-driven demand" in its sales pipeline. Q1 saw adjusted free cash flow of $265M, and Vertiv raised full-year FCF guidance to $1.25–1.35B – a sizable ~7% FCF yield at the current market cap. Importantly, Vertiv has aligned its product roadmap with Nvidia's requirements: it co-develops reference designs for high-density GPU racks, 800V DC power supplies, and liquid cooling solutions "in sync with NVIDIA's next-gen compute platforms," enabling turnkey "AI factory" buildouts. As AI clusters often require 2–3× the power density of traditional cloud racks, Vertiv's expertise in power conversion, thermal management, and battery backup is in high demand. The company announced collaborations to support 7MW+ "AI datacenter blocks" and noted that liquid cooling can cut data center power use by ~10%. We see Vertiv as an execution-critical "Queen" in our portfolio – its order growth (+13% org. in 2024) and margin expansion are impressive, but we remain mindful of its history of volatility and improving (but still moderate) margins. We continue to hold a moderate position, expecting outsized earnings growth as AI capex translates into higher sales, and would consider a larger stake on pullbacks. Vertiv's niche exposure makes it a potential strategic asset in the long run.
          </Text>
        </Box>
        
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Eaton (Electrical Equipment):</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Eaton is a diversified power management leader, and its latest earnings confirm AI data centers as a key growth driver even for large industrials. In Q1 2025, Eaton's data center related revenues grew &gt;45% and its electrical division's order pipeline was up 11% on a rolling basis (excluding a huge 2024 order). Management highlighted a "very large multi-year data center order" win and cited AI as spurring strong demand for its power distribution and backup systems. This aligns with our view that legacy power infrastructure is being upgraded to handle AI loads (e.g. GPU farms require ultra-reliable, high-capacity power, switchgear, and UPS systems – Eaton's forte). We hold Eaton as a steady "King" holding – it offers mid-teens EPS growth, a safe ~2% dividend, and a strong balance sheet. At ~20× earnings, Eaton isn't cheap for an industrial, but we believe its exposure to data center growth (alongside electrification trends broadly) justifies a premium. Tactically, we use Eaton and similar holdings to balance the volatility of pure-tech names, and to earn current income while participating in the AI infrastructure build-out.
          </Text>
        </Box>
      </VStack>
      
      <Heading as="h3" fontSize={{md:"lg",base:'md'}} fontWeight="500" mb={4}>
        Networking & Connectivity: Broadcom and Arista Networks
      </Heading>
      
      <VStack align="start" spacing={6} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Broadcom (Networking & Custom Silicon):</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Often overlooked in AI conversations, Broadcom is "the silent giant" in AI chips. In fact, Broadcom is the second-largest AI chip provider by revenue after Nvidia, thanks to its custom ASIC business for cloud hyperscalers. Notably, Broadcom has multi-year deals with Google: it co-designed and supplies core components for Google's TPU AI accelerators. One analysis estimates Google's TPU ramp could drive "multiple billions" of revenue for Broadcom, transforming Broadcom's mix over the next 2–3 years. Additionally, Broadcom's network switch chips (Jericho and Tomahawk families) dominate high-bandwidth ethernet switching – a critical part of AI clusters. Networking is the second-largest spending bucket in AI infrastructure (after GPUs), and Broadcom enjoys a major share via merchant silicon and custom designs. The company's CEO Hock Tan has indicated AI content growth could offset slowing smartphone chip demand, and Q1 results showed data-center networking strength. With the VMware acquisition closed in late 2024, Broadcom also owns an enterprise software portfolio generating stable cash. We view Broadcom as a cornerstone "King": a cash cow (40%+ FCF margins) with exposure to AI growth and a shareholder-friendly policy (dividend yield ~2.7%). Its stock trades at ~15× forward earnings – a reasonable valuation. We maintain a full weighting and use Broadcom as an income and stability anchor in the AI theme. Given its behind-the-scenes role in AI (chips and software), we are confident in Broadcom's long-term compounding and we raise our fair value range modestly to reflect higher AI-driven estimates.
          </Text>
        </Box>
        
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Arista Networks (Cloud Networking):</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Arista is emerging as a big winner in the "AI networking" arena, and Nvidia's commentary reinforces this. As cloud titans build massive AI clusters, they are adopting 800G Ethernet switching to connect thousands of GPU nodes – a transition Arista is leading. In Q1 2025, Arista's revenue jumped 28% YoY to $2.0B, a record quarter, and the company is on track for $750M in AI-specific networking revenue in 2025 (from nearly zero two years ago). Management noted "three of four major AI customers" are now in production with Arista's AI spine switches, which can scale to 100k+ GPU clusters. They also see a faster-than-expected shift from InfiniBand (Nvidia's proprietary networking in DGX systems) to Ethernet among newer "neo-cloud" players. This suggests even some AI deployments are opting for Arista's ultra-high-speed Ethernet solutions for flexibility and cost – a positive secular trend. Arista's gross margin of ~64% and operating leverage remain robust, indicating it can supply this growth without sacrificing profitability. We regard Arista as an elite "Queen" graduating toward Ace status, given its market leadership and execution. Our only caution is valuation: after a 3× stock rise in the past 18 months, Arista trades ~30× forward earnings, reflecting a lot of optimism. We have trimmed position size on rips but continue to hold Arista for long-term growth. Nvidia's results give us additional confidence that Arista's backlog (with cloud customers like Microsoft, Meta, etc.) will stay strong through 2025. We will monitor the competitive landscape (e.g. Juniper's new offerings, Cisco's response) but currently see Arista's focus and innovation as difficult to beat in high-performance data center networking.
          </Text>
        </Box>
      </VStack>
      
      <Heading as="h3" fontSize={{md:"lg",base:'md'}} fontWeight="500" mb={4}>
        AI Software Ecosystem: ServiceNow and Palantir
      </Heading>
      
      <VStack align="start" spacing={6} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>ServiceNow (Enterprise Software Platform):</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Nvidia's management emphasized the rise of "AI agents" – autonomous software agents that can carry out tasks – as a next wave for enterprise AI. ServiceNow, with its dominant workflow automation platform, is positioning itself as "the best platform for enterprise AI agents," per Jensen Huang's recent remarks. The two companies have a deep partnership: in Oct 2024 they announced a native integration where ServiceNow and Nvidia co-developed AI agent blueprints for the Now platform. By leveraging Nvidia's AI infrastructure (e.g. NVIDIA AI Enterprise software, NeMo frameworks) on ServiceNow's data, the goal is to enable "agentic AI" that can automate enterprise workflows in IT service, customer support, security, and more. The readthrough: As customers invest in GPU-powered AI capacity, they will seek business software to harness it – a positive demand indicator for ServiceNow's AI-driven offerings (like its Now Assist and generative AI capabilities announced at Knowledge 2025). ServiceNow itself delivered 39% YoY revenue growth in Q1 on strong U.S. demand, highlighting that AI excitement is translating into software spend. We classify ServiceNow as a high-quality "King" – a secular grower (20%+ CAGR) with expanding FCF margins (~30%+) that we rely on for stable growth exposure to enterprise AI adoption. Its valuation (~12× forward sales) is elevated, but justified by execution and retention metrics. We continue to hold ServiceNow as a core long-term compounder that complements our infrastructure hardware bets. The Nvidia partnership and Jensen's endorsement underscore ServiceNow's strategic relevance in the AI era.
          </Text>
        </Box>
        
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Palantir (Data/AI Platform):</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            Palantir's latest results confirm a transformative "AI boost" to its business. Q1 2025 revenue grew 39% YoY to $884M, accelerating sharply from ~18% growth rates last year, driven by demand for its new AI Platform (AIP). U.S. commercial revenue jumped 71% YoY and the company raised full-year 2025 guidance to 36% total growth, with an astounding +68% YoY in U.S. commercial. CEO Alex Karp described the rush to adopt large language models as a "stampede" and a "tectonic shift" in enterprise software demand. Palantir is positioning itself as "the operating system for the modern enterprise in the era of AI," integrating foundational models (including those trained on Nvidia hardware) into private workflows. From an ecosystem perspective, wider AI infrastructure deployment directly benefits Palantir: its Foundry and AIP software sit atop clients' AI computing environments (often Nvidia GPU clusters), enabling model training on sensitive internal data and powering decision-making applications. We've treated Palantir as an early-stage "Queen" due to its historically uneven earnings, but it is now solidly profitable (Q1 adjusted EPS $0.13; Rule-of-40 score 83%). With $2B+ annual revenue on the horizon and strong FCF generation, Palantir is graduating toward "King" status in our framework. Its valuation (~15× forward sales) reflects high expectations, so we remain size-disciplined, but we are more confident in Palantir's trajectory than at any point in its history. We will look for continued execution (e.g. conversion of its $800M+ TCV in U.S. commercial deals) and would use volatility to add to our position. Nvidia's commentary validates the critical role of software: GPUs and hardware alone are not enough – enterprises need platforms like Palantir to actually leverage AI models for competitive advantage.
          </Text>
        </Box>
      </VStack>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        Aces, Kings, and Queens – Updated Classifications & Fair Value Ranges
      </Heading>
      <Text mb={4} fontSize={{md:'md',base:'sm'}}>
        In light of the above developments, we have refreshed our internal classifications and fair value (FMV) estimates for key AI infrastructure holdings:
      </Text>
      
      <VStack align="start" spacing={6} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Box w="full">
          <HStack align="start" mb={2}>
            <Icon as={FiCheckSquare} color="green.500" boxSize={6} mt={1} />
            <Text fontWeight="500" fontSize={{md:'md',base:'sm'}}>Aces (High-Conviction Compounders):</Text>
          </HStack>
          <Text pl={10} mb={4} fontSize={{md:'md',base:'sm'}}>
            These are core positions with exceptional FCF growth, competitive moats, and central roles in AI infrastructure. Nvidia (NVDA) remains our top Ace, now reinforced by ~$70B TTM FCF and a virtually unchallenged position in AI compute. We raise our FMV range for NVDA to $120–$150 (post-split) from $100–$120 prior, to reflect higher forward cash flows – implying ~35–45× normalized FCF for a business compounding FCF &gt;30% annually. We are comfortable slightly overweighting NVDA, adding on dips given its strategic importance. We also elevate Arista Networks to Ace consideration: Arista's execution and niche dominance in AI networking justify a higher conviction rating, though we stop short of full "Ace" sizing due to valuation. For Arista, we peg FMV around $180–$200 (~25× 2025E EPS), acknowledging upside if AI-driven growth stays above 25% for longer. We will manage position size opportunistically, but view Arista as a long-term compounder alongside NVDA. (Note: We consider TSMC a special case – a King by our income-oriented definition, but an "Ace" in terms of indispensability. We simply continue to hold TSMC as a large core position for its strategic value.)
          </Text>
        </Box>
        
        <Box w="full">
          <HStack align="start" mb={2}>
            <Icon as={FiCheckSquare} color="green.500" boxSize={6} mt={1} />
            <Text fontWeight="500" fontSize={{md:'md',base:'sm'}}>Kings (Stable Compounders / Income-Payers):</Text>
          </HStack>
          <Text pl={10} mb={4} fontSize={{md:'md',base:'sm'}}>
            Kings are established leaders that combine solid growth with shareholder returns (dividends or buybacks), offering ballast to the portfolio. We reaffirm Broadcom (AVGO), Taiwan Semi (TSM), ServiceNow (NOW), and Eaton (ETN) as key Kings. Broadcom's FMV is nudged to ~$950 (about 18× FY2025 EPS) given its AI upside – we see the current ~$880 as attractive, yielding ~3%. TSM's FMV remains around $120 (~20× forward EPS) as we balance near-term cyclical risk with its secular role – at ~$105 today, it's a buy on any weakness. ServiceNow, despite no dividend, behaves like a King in our framework due to its durable growth; our FMV of $650 (≈12.5× 2025E sales) leaves modest upside – we'd be size-neutral and add only on pullbacks given the rich multiple. Eaton's FMV is $210 (20× 2025E EPS), close to the current price; we primarily hold it for a secure ~2% yield and will let our profits run as long as its AI/datacenter segment provides an extra growth kicker. In summary, our Kings bucket is geared toward near-term income and lower volatility: these names collectively yield ~1.5% and have lower drawdown risk, while still benefiting from AI trends (e.g. Broadcom's dividend funded by cloud ASIC revenues, TSM's capital returns fueled by AI chip orders). We will rebalance among Kings to maintain high-quality income – for instance, if Broadcom rallies well past our FMV, we might trim and reallocate to TSM or Eaton depending on relative value.
          </Text>
        </Box>
        
        <Box w="full">
          <HStack align="start" mb={2}>
            <Icon as={FiCheckSquare} color="green.500" boxSize={6} mt={1} />
            <Text fontWeight="500" fontSize={{md:'md',base:'sm'}}>Queens (Emerging Leaders and High-Growth Plays):</Text>
          </HStack>
          <Text pl={10} mb={4} fontSize={{md:'md',base:'sm'}}>
            Queens are our smaller, higher-risk positions with significant upside potential. After Nvidia's call, we are more confident in several Queens graduating upward. Palantir (PLTR), as discussed, is on a path to join the Kings – for now we keep it a Queen due to its short public track record, but with ~68% U.S. commercial growth guided and improving profitability, we have increased our stake modestly. Our updated FMV is $25 (was $20), reflecting ~15× 2025E gross profit – the stock (mid-$20s) is near this range, so we'd need a new pullback or a blowout quarter to add more. AMD (AMD) remains a Queen: its potential in AI accelerators is real, but not yet realized. We maintain FMV $170 (~30× 2025E EPS) and would only aggressively add if it significantly lagged (the stock around $160 is fairly valued in our view). Vertiv (VRT) is a classic Queen – mid-cap, formerly under-the-radar, now seeing explosive demand. We set Vertiv's FMV at $40 (15× 2025E EPS, or ~13× EV/EBITDA) as a reasonable mark given its guidance and debt paydown progress. With the stock in the low-$30s, there is still upside; however, due to its cyclicality, we keep a moderate position and may realize some gains if it overshoots our target. Others: We continue to evaluate emerging AI plays (for example, software startups or smaller hardware firms), but at this stage we believe our basket of Queens (Palantir, AMD, Vertiv, plus Arista previously in this category) provides ample asymmetric upside. Each is benefiting directly from the broader "AI factory" build-out signaled by Nvidia. We will monitor their execution closely – Queens must earn their way into larger allocations.
          </Text>
        </Box>
      </VStack>

      <Divider my={6} borderColor="black" />

      <Heading as="h2" fontSize={{md:"xl",base:'lg'}} fontWeight="500" mb={4}>
        Conclusion and Tactical Guidance
      </Heading>
      <Text mb={4} fontSize={{md:'md',base:'sm'}}>
        Nvidia's stellar quarter has reinforced the long-term trajectory of our AI Infrastructure thesis: the proliferation of AI models and services is driving capex cycles on a scale we've never seen, spanning chips, power systems, networks, and enterprise software. Our portfolio is positioned to capture this through a balanced approach:
      </Text>
      
      <VStack align="start" spacing={6} mb={6} fontSize={{md:'md',base:'sm'}}>
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Long-Term Compounders (Aces & select Kings):</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            We will remain overweight core AI enablers like Nvidia, Broadcom, and ServiceNow, which we expect to compound FCF at high rates over the next decade. We accept near-term valuation volatility in these names in exchange for outsized earnings growth and economic moats. Our conviction is buttressed by this earnings season – e.g. Nvidia's data center business is arguably on a ~$180B annual revenue run-rate (ex-China) by next year, which was almost unthinkable 18 months ago. We will opportunistically add to these positions on market pullbacks, using rigorous FMV discipline to guide entry points.
          </Text>
        </Box>
        
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Income and Downside Management (Kings):</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            To generate near-term income and dampen volatility, we lean on stable players like TSMC, Eaton, and Broadcom (with its hefty dividend). These provide cash returns and have more valuation support, helping us fund capital calls and distributions to our LPs even as we invest in the high-growth AI theme. Tactically, we may enhance income by writing covered calls on a portion of positions like Broadcom – capitalizing on periods of elevated implied volatility around earnings – while still maintaining core exposure. We will also continuously re-evaluate our Kings for any fundamental deterioration; at present, all exhibit strong backlogs and pricing power in the AI cycle.
          </Text>
        </Box>
        
        <Box w="full">
          <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} mb={2}>Selective Upside Bets (Queens):</Text>
          <Text mb={4} fontSize={{md:'md',base:'sm'}}>
            We will maintain smaller, venture-style allocations to our Queens bucket (Palantir, etc.), which provides the portfolio with high-octane upside if these names continue to execute. Given their higher risk, we size these such that, collectively, they do not jeopardize portfolio stability. We are prepared to scale up individual Queens to larger positions once they demonstrate sustained FCF generation (as Palantir is starting to). Conversely, we won't hesitate to cut a Queen if the AI tailwinds don't translate into tangible results. This quarter's readthroughs give us confidence in our current selection – each is riding a strong secular trend confirmed by Nvidia's report (e.g. Palantir's record U.S. commercial deals trace directly to enterprises deploying Nvidia-powered AI).
          </Text>
        </Box>
      </VStack>
      
      <Text mb={6} fontSize={{md:'md',base:'sm'}}>
        In sum, our strategy is to ride the AI infrastructure wave with conviction in the leaders, while managing risk via diversification and income generation. The May 2025 Nvidia earnings have only strengthened our resolve: AI is not a transient hype cycle but a fundamental platform shift, one that is driving real economic value for the companies providing the backbone. We will continue to update our thesis as new data emerges (e.g. upcoming earnings from cloud providers and enterprise IT firms), but our core view remains that we are in the early innings of a decade-long investment cycle. As always, we will execute patiently and prudently – focusing on quality, valuation discipline, and alignment with our long-term mandate of FCF compounding for our limited partners' benefit.
      </Text>
      
      <Text fontSize={{md:'sm',base:'xs'}} fontStyle="italic" mb={4}>
        Sources: Key data and quotes were sourced from Nvidia's Q1 FY2026 earnings release and call, as well as recent earnings reports of portfolio companies and partners including AMD, Arista Networks, Vertiv, Eaton, ServiceNow and Palantir. These validate the trends and figures discussed above and are detailed in the footnotes. We will be happy to provide additional backup or analysis on request.
      </Text>
      
      <Text fontSize={{md:'sm',base:'xs'}} mb={2}>Xx xx xx May 29 2025 746pm PT MS</Text>

      <Text fontWeight="500" fontSize={{md:'md',base:'sm'}} textAlign="center" mt={8} mb={4}>
        🤫 Confidential 🤐
      </Text>

      <Divider my={4} borderColor="black" />
    </Box>
  );
};

export default aiInfrastructure;