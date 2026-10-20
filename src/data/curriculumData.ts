import { UnitOfCompetency } from '../types/curriculum';

export const ACCREDITED_UNITS: UnitOfCompetency[] = [
  {
    id: 'scm-501',
    code: 'SCM501',
    title: 'Procurement & Purchasing Principles',
    level: 'Level 5 (Craft Certificate)',
    accreditation: 'KNEC & TVET CDACC Accredited',
    nominalHours: 60,
    iconName: 'ShoppingBag',
    color: 'emerald',
    summary:
      'Covers the procurement cycle, the 5 Rights of Purchasing, supplier evaluation criteria, procurement methods under Kenya’s Public Procurement and Asset Disposal Act (PPADA 2015), and statutory compliance.',
    learningOutcomes: [
      'Understand the complete procurement operational cycle from requisition to payment.',
      'Apply the Five Rights of Purchasing in commercial and public sourcing.',
      'Evaluate prospective suppliers using structured qualification frameworks (Carter’s 10 Cs).',
      'Distinguish procurement methods and threshold regulations under PPADA 2015 and Regulations 2020.',
      'Implement AGPO (Access to Government Procurement Opportunities) reservation schemes.',
    ],
    subTopics: [
      {
        id: 'scm-501-t1',
        title: 'The Procurement Cycle (Requisition to Payment)',
        summary:
          'The procurement cycle represents the sequential stages required to acquire goods, services, or works from identification of need to contract closure.',
        keyPoints: [
          'Need Identification: End-user generates an authorized Purchase Requisition (PR) detailing technical specifications or Bill of Quantities (BOQ).',
          'Budget Verification & Sourcing Approval: Confirmation of allocated funds and vote-head by Finance / Accounting officer.',
          'Market Sourcing & Solicitation: Preparation of Bidding Documents (RFQ, RFP, or Tender documents) and inviting bids based on approved threshold.',
          'Bid Receipt & Formal Opening: In public procurement (PPADA 2015 Sec 78), tenders are opened publicly immediately after closing time by the Tender Opening Committee.',
          'Evaluation: Conducted by an appointed Tender Evaluation Committee across Preliminary (Mandatory compliance), Technical (Score matrix), and Financial evaluation.',
          'Award of Contract: Professional opinion written by Head of Procurement Function (HPF) and presented to Accounting Officer for award determination.',
          'Notification of Award: Issuing letters of intention to award with mandatory 14-day standstill period for administrative reviews (PPARB).',
          'Contract Signing & Local Purchase Order (LPO): Legally binding agreement or official Local Service Order (LSO) issued.',
          'Expediting & Delivery: Active tracking to ensure compliance with agreed delivery schedule and Incoterms.',
          'Inspection, Acceptance & Invoicing: Goods Received Note (GRN) and Inspection and Acceptance Committee Certificate generated prior to invoice matching (3-Way Match: PO, GRN, Invoice) for payment.',
        ],
        kenyanLegalContext:
          'Governed strictly by PPADA 2015 Sections 67–89. Section 78 stipulates that tenders must be opened publicly and minutes signed by all committee members. Section 84 mandates that the Head of Procurement Function must render an independent professional opinion to the Accounting Officer before any contract award.',
        practicalExample:
          'When Kenyatta National Hospital procures pharmaceutical supplies, the Pharmacy Department raises a requisition. Procurement advertises via the Public Procurement Information Portal (PPIP). After technical evaluation, a 14-day standstill period is observed before the Local Purchase Order is released.',
        examinerTips:
          'KNEC Section B frequently awards 15–20 marks for outlining the procurement cycle. Draw a sequential flowchart and explicitly mention the 3-Way Match (Purchase Order, GRN, and Supplier Invoice) required before accounts release payment.',
        diagramOrTable: {
          type: 'flowchart',
          title: 'Standard KNEC Procurement Cycle Workflow',
          steps: [
            { step: 1, label: 'Need Identification', desc: 'User department creates authorized Purchase Requisition with specifications.' },
            { step: 2, label: 'Budget Approval', desc: 'Accounting officer confirms fund availability and budget allocation.' },
            { step: 3, label: 'Tender Solicitation', desc: 'Issuance of RFQ, RFP, or Open Tender through national portals.' },
            { step: 4, label: 'Tender Opening & Evaluation', desc: 'Public opening followed by Preliminary, Technical, and Financial scoring.' },
            { step: 5, label: 'Professional Opinion & Award', desc: 'Head of Procurement presents written advice to Accounting Officer.' },
            { step: 6, label: '14-Day Standstill & Contract', desc: 'Notification letters sent; PPARB window observed before signing.' },
            { step: 7, label: 'Receipt, Inspection & Payment', desc: 'Inspection Acceptance Certificate, GRN, and 3-way match settlement.' },
          ],
        },
      },
      {
        id: 'scm-501-t2',
        title: 'The Five Rights of Purchasing',
        summary:
          'The fundamental benchmark criteria determining whether an acquisition delivers optimal Value for Money (VFM) to an organization.',
        keyPoints: [
          'Right Quality: Fitness for purpose, technical specification conformance, durability, and compliance with statutory standards (e.g. KEBS diamond mark of quality).',
          'Right Quantity: Optimizing order sizes to satisfy operational demand while minimizing inventory holding costs and risk of obsolescence.',
          'Right Price: Total Cost of Ownership (TCO), including acquisition, transportation, maintenance, and disposal, rather than solely the lowest purchase quote.',
          'Right Time: Ensuring delivery aligns with the lead time requirements of production lines or project schedules without causing idle downtime or rush shipping surcharges.',
          'Right Place: Delivering to the designated site, central warehouse, or branch location under specified Incoterms with appropriate handling facilities.',
        ],
        kenyanLegalContext:
          'PPADA 2015 Section 3 highlights the promotion of integrity and fairness, maximum economy and efficiency, and value for money as statutory principles reflecting the 5 Rights.',
        practicalExample:
          'A tea processing factory in Kericho ordering boiler parts must have KEBS-certified steel (Quality), enough for 3 months production (Quantity), negotiated volume pricing (Price), delivered 2 days before the seasonal harvest surge (Time), directly to the factory store floor (Place).',
        examinerTips:
          'Do not merely list the five rights. KNEC examiners award full marks (typically 10 marks) only when you define each right AND state the operational risk if that right is violated (e.g. wrong quantity leads to stockouts or bloated holding cost).',
      },
      {
        id: 'scm-501-t3',
        title: 'Procurement Methods Under PPADA 2015 & Regs 2020',
        summary:
          'Kenyan public procurement laws define specific standard methods used based on threshold values, market structure, urgency, and technical complexity.',
        keyPoints: [
          'National Open Tender: Default statutory procurement method for public entities in Kenya (PPADA Sec 91). Open to all qualified domestic citizen suppliers.',
          'International Open Tender: Used when competition is not available locally or goods require specialized overseas manufacturing.',
          'Request for Quotations (RFQ): Used for standard off-the-shelf goods within prescribed threshold limits (normally goods below KES 3 Million for Class A entities). Requires at least 3 valid competitive quotations.',
          'Direct Procurement: Sole-source procurement used strictly under exceptional conditions: sole proprietary rights (monopoly), national defense emergency, or compatibility with existing equipment (PPADA Sec 103).',
          'Restricted Tendering: Sourcing from a pre-qualified list when specialized technical skills are required or open tendering costs are disproportionate.',
          'Low-Value Procurement: Minor incidental procurements not exceeding statutory threshold (e.g. KES 50,000 per item), subjected to monthly aggregation limits.',
          'AGPO (Access to Government Procurement Opportunities): Mandatory 30% allocation of total public procurement spend reserved for Youth, Women, and Persons with Disabilities (PWDs).',
        ],
        kenyanLegalContext:
          'PPADA 2015 Sections 91–106. Class A entities (State Corporations, Constitutional Commissions), Class B entities (County Governments), and Class C (Schools/TVET institutions) operate under gazetted monetary thresholds in the Public Procurement Regulations 2020.',
        practicalExample:
          'A public university procuring laboratory cleaning supplies uses RFQ with 5 registered suppliers. When procuring a multimillion high-tech electron microscope, it conducts an International Open Tender with a 30-day advertisement window in national dailies and MyGov.',
        examinerTips:
          'In KNEC papers, questions regarding "Circumstances under which Direct Procurement is permitted" occur frequently. Memorize: sole supplier/patent rights, catastrophic emergency, standardization/interchangeability with existing machinery, and no reasonable alternative.',
        diagramOrTable: {
          type: 'table',
          title: 'Kenyan Public Procurement Methods Comparison',
          headers: ['Procurement Method', 'Legal Basis', 'Key Condition for Use', 'Minimum Quotations/Bids'],
          rows: [
            ['National Open Tender', 'PPADA Sec 91', 'Default method for high-value contracts', 'Advertised nationally (Min 14 days)'],
            ['Request for Quotations (RFQ)', 'PPADA Sec 105', 'Standard, off-the-shelf items below threshold', 'At least 3 valid sealed quotes'],
            ['Direct Procurement', 'PPADA Sec 103', 'Sole supplier, emergency, or spare parts compatibility', 'Single supplier (Strict justification)'],
            ['Restricted Tendering', 'PPADA Sec 102', 'Complex or specialized items with limited providers', 'Direct invitation to pre-qualified list (Min 10)'],
            ['AGPO Schemes', 'PPADA Sec 53(6)', '30% reserved procurement for Women, Youth & PWDs', 'Registered AGPO enterprise certificates'],
          ],
        },
      },
    ],
  },
  {
    id: 'scm-502',
    code: 'SCM502',
    title: 'Warehousing & Stores Operations',
    level: 'Level 5 (Craft Certificate)',
    accreditation: 'KNEC & TVET CDACC Accredited',
    nominalHours: 55,
    iconName: 'Warehouse',
    color: 'blue',
    summary:
      'Store layout planning, material handling systems, receiving and inspection procedures, store records (GRN, SIV, Bin Cards), and stock preservation methods (FIFO, LIFO, FEFO).',
    learningOutcomes: [
      'Design functional store layouts prioritizing safety, accessibility, and material flow.',
      'Execute standard receiving, quality inspection, and discrepancy documentation.',
      'Maintain statutory and operational store records (Bin Cards, Store Ledgers, SIVs).',
      'Select and operate appropriate material handling equipment complying with OSHA 2007.',
      'Apply stock rotation techniques (FIFO, FEFO) to eliminate deterioration and dead stock.',
    ],
    subTopics: [
      {
        id: 'scm-502-t1',
        title: 'Store Layout & Warehouse Design Principles',
        summary:
          'Effective warehouse layout minimizes handling costs, maximizes cubic space utilization, ensures worker safety, and facilitates smooth material flow.',
        keyPoints: [
          'Material Flow Configurations: U-shaped flow (intake and dispatch on the same side sharing loading docks), I-shaped / Straight-through flow (intake at one end, dispatch at the opposite for high volumes), and L-shaped flow.',
          'Key Store Functional Zones: Receiving/Unloading Bay, Staging & Quality Inspection Zone, Bulk Storage, Forward Picking Area, Packaging & Staging, Dispatch Bay, and Quarantine/Damaged Goods Area.',
          'Cubic Space Utilization: Utilizing vertical height through pallet racking, cantilever racks for timber/pipes, and mezzanine floors rather than only floor square footage.',
          'Aisle Width Optimization: Wide aisles (for counterbalanced forklifts, ~3.5m), Narrow aisles (for reach trucks, ~2.7m), and Very Narrow Aisles (VNA for turret trucks, ~1.5m).',
          'Safety & OSHA 2007 Standards: Fire exits, clearly demarcated pedestrian walkways, sprinkler clearance (minimum 0.5m), emergency eyewash stations, and load capacity markings on racking.',
        ],
        kenyanLegalContext:
          'Occupational Safety and Health Act (OSHA 2007 Kenya) Section 55 specifies clear passage widths, emergency exit signage, ventilation, and structural load testing for industrial storage racks.',
        practicalExample:
          'A beverage distributor in Industrial Area, Nairobi uses a U-shaped warehouse layout with heavy pallets of soda on lower ground tiers and fast-moving single bottles in mid-level forward pick faces.',
        examinerTips:
          'KNEC questions often ask candidates to sketch and label a store layout. Always show: Receipt door, Inspection area, Fast vs Slow moving zones, Bin storage, Issue counter, Fire exit, and Quarantine cage.',
      },
      {
        id: 'scm-502-t2',
        title: 'Receiving, Inspection & Documentation (GRN, Delivery Note)',
        summary:
          'The receiving process safeguards the organization against accepting short shipments, defective goods, or unapproved deliveries.',
        keyPoints: [
          'Step 1 - Physical Vehicle Intake: Vehicle logging at security gate, checking seals on containerized consignments.',
          'Step 2 - Verification Against Purchase Order: Verifying Delivery Note (DN) and packing slip against original Local Purchase Order (LPO). Deliveries without valid PO must be turned away.',
          'Step 3 - Unloading & Count Check: Verifying quantity of outer cartons, pallets, or drum units before signing carrier waybills.',
          'Step 4 - Detailed Inspection: Quality checking against specifications (KEBS standards, dimensions, expiry dates, batch numbers).',
          'Step 5 - Goods Received Note (GRN): Generated by the storekeeper once items pass inspection. Documents item code, quantity accepted, quantity rejected, PO number, and bin location.',
          'Step 6 - Discrepancy Handling: Generating a Goods Rejection / Advice Note or Discrepancy Report if items are damaged, expired, or non-conforming.',
        ],
        kenyanLegalContext:
          'Under PPADA 2015 Section 48, public entities must establish an Inspection and Acceptance Committee of at least three members to examine goods and issue an Inspection and Acceptance Certificate within reasonable time.',
        practicalExample:
          'When county health facilities receive medical gloves, the Inspection and Acceptance Committee tests sample boxes against KEBS medical standards before the storekeeper raises the official GRN.',
        examinerTips:
          'Distinguish clearly between a Delivery Note (issued by supplier/transporter accompanying shipment) and a Goods Received Note (internal document raised by receiving storekeeper confirming verified receipt).',
      },
      {
        id: 'scm-502-t3',
        title: 'Store Records & Stock Preservation (Bin Cards, SIV, FIFO/FEFO)',
        summary:
          'Accurate store records ensure continuous audit trails, prevent theft/shrinkage, and enable accurate stock reconciliation.',
        keyPoints: [
          'Bin Card: Kept physically attached to the storage shelf/bin. Records date, receipt reference (GRN), issue reference (SIV), quantity in, quantity out, and balance on hand in real time.',
          'Store Ledger: Maintained in the procurement/finance office (often on ERP system). Records quantities and monetary values of stock movements.',
          'Store Issue Voucher (SIV): Official internal document authorising the release of stock from store to an authorized user department upon signature.',
          'FIFO (First-In, First-Out): Oldest stock received is issued first. Essential for goods subject to deterioration, style changes, or mild degradation.',
          'FEFO (First-Expired, First-Out): Goods with the earliest expiration date are issued first, regardless of when they arrived in the warehouse (standard for pharmaceuticals, foods, and chemicals).',
          'LIFO (Last-In, First-Out): Most recently acquired goods are issued first. Rarely used operationally; restricted under International Financial Reporting Standards (IAS 2).',
        ],
        kenyanLegalContext:
          'Public Financial Management (PFM) Act 2012 and National Treasury circulars mandate perpetual store records and quarterly physical stock verifications across all Kenyan government stores.',
        practicalExample:
          'In a supermarket distribution depot in Eldoret, dairy products and yogurts are managed strictly using FEFO so products with upcoming sell-by dates are dispatched to retail shelves first.',
        examinerTips:
          'KNEC Section A regularly tests: "Differentiate between a Bin Card and a Store Ledger." Highlight that Bin Cards record QUANTITIES ONLY and are kept in the warehouse bin, while Store Ledgers record QUANTITIES AND VALUES and are maintained in the accounting office.',
      },
    ],
  },
  {
    id: 'scm-503',
    code: 'SCM503',
    title: 'Inventory Control & Management',
    level: 'Level 5 (Craft Certificate)',
    accreditation: 'KNEC & TVET CDACC Accredited',
    nominalHours: 65,
    iconName: 'Boxes',
    color: 'amber',
    summary:
      'Inventory cost analysis, Economic Order Quantity (EOQ) mathematical derivations, stock level formulas (Reorder Level, Minimum, Maximum, Danger levels), ABC inventory classification, and stocktaking methods.',
    learningOutcomes: [
      'Calculate Economic Order Quantity (EOQ) and determine total annual inventory holding and ordering costs.',
      'Establish statistical stock control levels (Reorder Level, Safety Stock, Min/Max thresholds).',
      'Classify enterprise inventory utilizing Pareto ABC, VED, and FSN analysis.',
      'Conduct periodic and continuous physical stocktaking and execute reconciliation procedures.',
      'Identify stock holding costs and formulate strategies to minimize working capital lockup.',
    ],
    keyFormulas: [
      {
        name: 'Economic Order Quantity (EOQ)',
        formula: 'EOQ = sqrt((2 * D * S) / H)',
        variables: [
          { symbol: 'D', meaning: 'Annual Demand (units per annum)' },
          { symbol: 'S', meaning: 'Cost per Order (ordering/setup cost in KES)' },
          { symbol: 'H', meaning: 'Holding Cost per unit per year (or C * i% where C = unit cost, i = holding %)' },
        ],
        exampleProblem:
          'A manufacturing plant in Thika has an annual demand of 10,000 units of component X. The cost of placing an order is KES 500, and the holding cost per unit per annum is KES 4. Calculate the EOQ and the number of orders per year.',
        solutionSteps: [
          'Step 1: Identify values: D = 10,000 units, S = KES 500, H = KES 4.',
          'Step 2: Apply formula: EOQ = sqrt((2 * 10000 * 500) / 4).',
          'Step 3: Calculate numerator: 2 * 10,000 * 500 = 10,000,000.',
          'Step 4: Divide by H: 10,000,000 / 4 = 2,500,000.',
          'Step 5: Take square root: sqrt(2,500,000) = 1,581.14 -> 1,581 units.',
          'Step 6: Number of orders per year = D / EOQ = 10,000 / 1,581 = 6.32 orders (approx 6 to 7 orders).',
        ],
      },
      {
        name: 'Reorder Level (ROL)',
        formula: 'ROL = Maximum Usage Rate * Maximum Lead Time',
        variables: [
          { symbol: 'Max Usage', meaning: 'Peak consumption rate per day/week' },
          { symbol: 'Max Lead Time', meaning: 'Longest anticipated delivery time in days/weeks' },
        ],
        exampleProblem:
          'A hospital consumes between 20 and 50 boxes of surgical gloves per day. Lead time from supplier varies between 4 and 10 days. Calculate the Reorder Level (ROL).',
        solutionSteps: [
          'Step 1: Identify Max Usage = 50 boxes/day.',
          'Step 2: Identify Max Lead Time = 10 days.',
          'Step 3: ROL = 50 * 10 = 500 boxes.',
          'Interpretation: An order for fresh supplies must be triggered immediately when glove stock drops to 500 boxes.',
        ],
      },
      {
        name: 'Minimum Stock Level (Safety Buffer)',
        formula: 'Minimum Stock = ROL - (Average Usage * Average Lead Time)',
        variables: [
          { symbol: 'ROL', meaning: 'Reorder Level already determined' },
          { symbol: 'Avg Usage', meaning: 'Normal average daily consumption' },
          { symbol: 'Avg Lead Time', meaning: 'Average supplier delivery time' },
        ],
        exampleProblem:
          'Using the previous glove data: Average usage is 35 boxes/day, average lead time is 7 days, and ROL is 500 boxes. Calculate the Minimum Stock Level.',
        solutionSteps: [
          'Step 1: Average Lead Time Consumption = 35 boxes * 7 days = 245 boxes.',
          'Step 2: Minimum Stock = 500 - 245 = 255 boxes.',
          'Interpretation: 255 boxes represents the safety cushion protecting against unexpected demand surges or supplier delays.',
        ],
      },
      {
        name: 'Maximum Stock Level',
        formula: 'Maximum Stock = ROL + EOQ - (Minimum Usage * Minimum Lead Time)',
        variables: [
          { symbol: 'ROL', meaning: 'Reorder Level' },
          { symbol: 'EOQ', meaning: 'Economic Order Quantity' },
          { symbol: 'Min Usage', meaning: 'Lowest daily/weekly consumption' },
          { symbol: 'Min Lead Time', meaning: 'Shortest possible delivery time' },
        ],
        exampleProblem:
          'If ROL is 500 boxes, EOQ is 1,000 boxes, Minimum usage is 20 boxes/day, and minimum lead time is 4 days, calculate the Maximum Stock Level.',
        solutionSteps: [
          'Step 1: Minimum Lead Time Consumption = 20 * 4 = 80 boxes.',
          'Step 2: Maximum Stock = 500 + 1,000 - 80 = 1,420 boxes.',
          'Interpretation: Total stock in store should not exceed 1,420 boxes to avoid working capital lockup and storage congestion.',
        ],
      },
    ],
    subTopics: [
      {
        id: 'scm-503-t1',
        title: 'Inventory Cost Structure & EOQ Derivation',
        summary:
          'Inventory costs comprise ordering costs, holding costs, acquisition costs, and stockout costs. EOQ balances ordering and holding costs to find the minimum total cost.',
        keyPoints: [
          'Ordering Costs (S): Costs incurred every time an order is placed (tendering, communication, carriage inwards, receiving inspection, clerical processing). Increases with frequency of orders.',
          'Holding / Carrying Costs (H): Costs of keeping inventory over time (warehouse rent, insurance, refrigeration power, obsolescence, deterioration, theft, and opportunity cost of capital). Increases with order batch size.',
          'EOQ Mathematical Principle: At the EOQ point, Annual Ordering Cost equals Annual Holding Cost: (D/Q)*S = (Q/2)*H.',
          'Solving for Q gives: Q^2 = (2*D*S)/H -> Q = sqrt((2*D*S)/H).',
          'Assumptions of the Basic EOQ Model: Constant known demand, zero lead time (or known constant), instantaneous replenishment, fixed purchase price (no quantity discounts), no stockouts allowed.',
        ],
        kenyanLegalContext:
          'Public entities in Kenya must justify batch procurement sizes to the National Treasury and Auditor General to prevent unnecessary capital lockup in inventory.',
        practicalExample:
          'Kenya Power (KPLC) ordering wooden utility poles balances the heavy administrative cost of floating a tender against the yard holding and security cost of storing thousands of treated poles.',
        examinerTips:
          'KNEC calculation questions on EOQ often ask candidates to calculate Total Annual Cost at EOQ. Formula: Total Cost = (D/EOQ)*S + (EOQ/2)*H. Note that at EOQ, ordering cost and holding cost must be identical or practically equal!',
      },
      {
        id: 'scm-503-t2',
        title: 'ABC Inventory Classification (Pareto Principle)',
        summary:
          'ABC analysis categorizes inventory into three classes based on annual monetary usage value, allowing selective control and targeted store management.',
        keyPoints: [
          'Class A Items: Represent 70–80% of total annual consumption value, but only 10–20% of total inventory line items. Requires rigorous senior management oversight, frequent cycle counts, low safety stocks, and tight supplier collaboration.',
          'Class B Items: Represent 15–20% of total monetary value and 20–30% of inventory items. Managed with moderate controls, regular review cycles, and standard EOQ replenishment.',
          'Class C Items: Represent only 5–10% of total monetary value, but account for 50–60% of total inventory items (nuts, bolts, labels, stationery). Managed with simple two-bin systems, bulk ordering, and high safety stocks to prevent administrative burden.',
          'VED Analysis (Complementary): Vital (production halts immediately without it), Essential (production slows down or suffers), Desirable (minor convenience).',
        ],
        kenyanLegalContext:
          'Auditor General reports frequently cite poor management of Class A medical and engineering spare parts in parastatals.',
        practicalExample:
          'At an automotive assembly plant in Mombasa, diesel engines and transmissions are Class A items (high value, small quantity), brake pads and alternators are Class B, while screws and plastic clips are Class C.',
        examinerTips:
          'KNEC questions frequently ask you to explain how management policy differs between Class A and Class C items. Contrast: review frequency, safety stock level, ordering method, and authority required for purchase.',
        diagramOrTable: {
          type: 'matrix',
          title: 'ABC Inventory Classification Breakdown',
          headers: ['Category', '% of Total Items (Quantity)', '% of Annual Usage Value (KES)', 'Control Policy Required'],
          rows: [
            ['Class A (High Value)', '10% – 20%', '70% – 80%', 'Strict daily/weekly control, low buffer stock, senior approval'],
            ['Class B (Moderate Value)', '20% – 30%', '15% – 20%', 'Standard EOQ control, monthly review, moderate buffer'],
            ['Class C (Low Value)', '50% – 60%', '5% – 10%', 'Simple visual two-bin system, bulk purchasing, high buffer'],
          ],
        },
      },
      {
        id: 'scm-503-t3',
        title: 'Stocktaking Methods & Stock Discrepancy Reconciliation',
        summary:
          'Physical stocktaking verifies the actual physical existence, condition, and count of inventory compared to book records (Bin cards and Store ledger).',
        keyPoints: [
          'Periodic Stocktaking: Counting all inventory items across the entire warehouse at a specific point in time (usually annual or semi-annual financial year end). Often requires shutting down store operations.',
          'Continuous (Perpetual) Stocktaking: A continuous cycle counting system where specialized counting teams check a predetermined number of items daily throughout the year without disrupting business.',
          'Spot Checking: Random, unannounced physical counts conducted by internal auditors to detect pilferage, discrepancies, or record negligence.',
          'Common Causes of Stock Discrepancies: Arithmetic recording errors on bin cards, unrecorded issues or transfers, theft/pilferage, shrinkage due to evaporation/drying, damage, and misplaced bin locations.',
          'Stock Reconciliation Procedure: Physical count verified -> Compare with bin card -> Investigate variances -> Report to Stock Verification Committee -> Accounting write-off approval.',
        ],
        kenyanLegalContext:
          'Section 162 of PPADA 2015 requires public entities to conduct annual inventory asset verification and submit disposal recommendations for unserviceable, obsolete, or surplus stores.',
        practicalExample:
          'Safaricom distribution centers perform daily continuous cycle counts on high-value smartphones (Class A) every evening, while accessories (cases, screen protectors) are counted quarterly.',
        examinerTips:
          'In KNEC exam essays, compare Periodic vs Continuous stocktaking across 4 dimensions: store disruption, manpower requirement, early error detection, and year-end accounting pressure.',
      },
    ],
  },
  {
    id: 'scm-504',
    code: 'SCM504',
    title: 'Logistics, Freight & Distribution Management',
    level: 'Level 5 (Craft Certificate)',
    accreditation: 'KNEC & TVET CDACC Accredited',
    nominalHours: 60,
    iconName: 'Truck',
    color: 'indigo',
    summary:
      'Modal choice (Road, Rail, Air, Sea, Pipeline), Incoterms® 2020 international commercial terms, shipping documentation (Bill of Lading, AWB), customs clearance (KenTrade/ICMS), and reverse logistics.',
    learningOutcomes: [
      'Select optimum transport modes evaluating speed, capacity, cost, safety, and reliability.',
      'Interpret and apply Incoterms® 2020 rules allocating costs, risk, and transport duties.',
      'Process international freight documentation (Bill of Lading, Airway Bill, Certificate of Origin).',
      'Navigate Kenyan customs clearance procedures through the Kenya TradeNet (KenTrade) and KRA ICMS.',
      'Design sustainable reverse logistics networks for returns, warranty repairs, and recycling.',
    ],
    subTopics: [
      {
        id: 'scm-504-t1',
        title: 'Modes of Transportation: Evaluation & Selection Criteria',
        summary:
          'The five core transport modes provide varied operational capabilities depending on cargo physical characteristics, urgency, distance, and freight budget.',
        keyPoints: [
          'Road Transport: Door-to-door flexibility, ideal for short-to-medium hauls, high accessibility, but prone to traffic congestion, road axle-load limits, and higher fuel costs per ton-km.',
          'Rail Transport (e.g. Kenya SGR / MGR): High bulk capacity, cost-effective for heavy commodities (cement, grain, fuel) over long distances, eco-friendly, but inflexible routes and dependent on intermodal feeder transport.',
          'Sea / Maritime Transport: Backbone of international trade (>80% volume), lowest cost per ton-km for intercontinental containerized freight, but slow transit times and port congestion.',
          'Air Freight: Highest transit speed, security, and low packaging requirements, ideal for high-value low-weight items (cut flowers, electronics, emergency pharmaceuticals), but very expensive with strict weight limits.',
          'Pipeline Transport: Continuous automated conveyance of liquids and gases (e.g., Kenya Pipeline Company - KPC moving petroleum products from Mombasa to Nairobi, Nakuru, and Kisumu), weather-proof and low operating cost, but high initial capital investment and fixed routing.',
        ],
        kenyanLegalContext:
          'East African Community (EAC) Vehicle Load Control Act 2016 sets gross vehicle weight limits (maximum 56 tons for 7-axle trucks) enforced by KeNHA weighbridges along the Northern Corridor.',
        practicalExample:
          'Kenyan horticultural exporters in Naivasha use refrigerated trucks to move fresh cut roses to Jomo Kenyatta International Airport (JKIA), where cargo flights fly them to Amsterdam flower auctions within 24 hours.',
        examinerTips:
          'KNEC questions frequently present a scenario asking candidates to recommend and justify the best transport mode for specific goods (e.g. crude oil, fresh flowers, heavy mining machinery). Give at least 4 distinct evaluation factors.',
      },
      {
        id: 'scm-504-t2',
        title: 'Incoterms® 2020 Rules & Risk Handover',
        summary:
          'Published by the International Chamber of Commerce (ICC), Incoterms define the exact point where cost, insurance, and risk transfer from seller to buyer.',
        keyPoints: [
          'EXW (Ex Works): Minimum seller obligation. Buyer bears all transport costs, export clearance, and risk from seller premises.',
          'FCA (Free Carrier): Seller delivers cleared goods to buyer-nominated carrier at specified place.',
          'FOB (Free on Board): Sea/inland waterway only. Seller delivers goods placed on board the vessel nominated by buyer at port of shipment (e.g. FOB Port of Mombasa). Risk transfers when goods are on board.',
          'CIF (Cost, Insurance & Freight): Sea/waterway only. Seller pays freight to destination port and obtains marine insurance. Risk transfers to buyer once goods are loaded on board at port of departure!',
          'CIP (Carriage and Insurance Paid to): Multimodal equivalent of CIF. Seller procures comprehensive insurance (Institute Cargo Clauses A) to named destination.',
          'DDP (Delivered Duty Paid): Maximum seller obligation. Seller delivers goods to buyer destination cleared for import with all taxes and customs duties paid.',
        ],
        kenyanLegalContext:
          'Under Kenyan procurement guidelines, public entities are discouraged from purchasing on EXW terms due to overseas logistics exposure, generally preferring CIF Mombasa or DDP destination store.',
        practicalExample:
          'An importer in Nairobi purchasing industrial generators from Hamburg on CIF Mombasa terms: The German seller pays shipping and insurance to Mombasa, but the Kenyan buyer assumes risk once the ship departs Hamburg, and pays port clearance and transport from Mombasa to Nairobi.',
        examinerTips:
          'A classic KNEC trap question: "Under CIF terms, where does risk pass from seller to buyer?" Many candidates incorrectly say destination port. The correct answer: Risk transfers at the port of origin when goods are loaded onto the ship, even though seller pays freight and insurance to the destination port!',
        diagramOrTable: {
          type: 'table',
          title: 'Key Incoterms® 2020 Quick Reference',
          headers: ['Incoterm', 'Mode of Transport', 'Who Pays Main Carriage?', 'Point of Risk Transfer', 'Export Clearance'],
          rows: [
            ['EXW (Ex Works)', 'Any Mode', 'Buyer', 'Seller factory/warehouse gate', 'Buyer responsibility'],
            ['FOB (Free on Board)', 'Maritime Only', 'Buyer', 'When loaded on board vessel at port of origin', 'Seller responsibility'],
            ['CIF (Cost, Ins & Freight)', 'Maritime Only', 'Seller', 'When loaded on board vessel at port of origin', 'Seller responsibility'],
            ['CIP (Carriage & Ins Paid)', 'Any / Multimodal', 'Seller', 'When handed to first carrier at origin', 'Seller responsibility'],
            ['DDP (Delivered Duty Paid)', 'Any Mode', 'Seller', 'Delivered at named destination, import cleared', 'Seller responsibility'],
          ],
        },
      },
      {
        id: 'scm-504-t3',
        title: 'Freight & Customs Documentation (Bill of Lading, AWB, KenTrade)',
        summary:
          'Shipping documentation serves three vital legal functions: document of title, receipt of goods, and evidence of contract of carriage.',
        keyPoints: [
          'Bill of Lading (B/L): Ocean shipping document. Functions as: (1) Document of Title (ownership transferable by endorsement), (2) Receipt from shipping line, (3) Evidence of contract of carriage. Clean B/L indicates goods received in apparent good order; Claused/Foul B/L notes damage.',
          'Airway Bill (AWB): Air freight document. Crucial difference: An AWB is NOT a document of title; it is a non-negotiable receipt and consignment note.',
          'Commercial Invoice: Formal bill from seller to buyer showing quantities, unit prices, Incoterm, and total monetary value used by customs for valuation.',
          'Certificate of Origin: Verifies country where goods were manufactured to determine eligibility for preferential tariffs (e.g. EAC, COMESA, AfCFTA).',
          'Kenya National Electronic Single Window System (KenTrade / TradeNet): Single digital entry point for all import/export regulatory permits in Kenya.',
          'KRA ICMS (Integrated Customs Management System): Automated declarations, customs duty payment, and release of cargo at sea and airports.',
        ],
        kenyanLegalContext:
          'Pre-Export Verification of Conformity (PVoC) administered by KEBS requires imported goods to obtain a Certificate of Conformity (CoC) before shipping to Kenya.',
        practicalExample:
          'Tea exported through Mombasa to Egypt requires an endorsed Original Bill of Lading, a COMESA Certificate of Origin for zero-tariff entry, and an export sanitary certificate.',
        examinerTips:
          'KNEC Section A regularly tests the distinction between Bill of Lading and Airway Bill. The key difference: Bill of Lading is a negotiable document of title, whereas Airway Bill is non-negotiable.',
      },
    ],
  },
  {
    id: 'scm-505',
    code: 'SCM505',
    title: 'Contract Administration & Commercial Law',
    level: 'Level 5 (Craft Certificate)',
    accreditation: 'KNEC & TVET CDACC Accredited',
    nominalHours: 50,
    iconName: 'FileText',
    color: 'rose',
    summary:
      'Elements of a valid contract under Kenyan law (Law of Contract Act Cap 23), types of procurement contracts, contract management KPIs, liquidated damages, breach remedies, and dispute resolution.',
    learningOutcomes: [
      'Examine the legal requirements for the formation of a legally enforceable commercial contract.',
      'Differentiate pricing structures in procurement contracts (Fixed Price, Cost-Plus, Frameworks).',
      'Manage supplier performance metrics (SLAs, delivery schedules, quality benchmarks).',
      'Enforce remedies for breach of contract including liquidated damages and performance bonds.',
      'Navigate alternative dispute resolution (ADR) mechanisms: negotiation, mediation, and arbitration.',
    ],
    subTopics: [
      {
        id: 'scm-505-t1',
        title: 'Essentials of a Valid Commercial Contract',
        summary:
          'A legally binding contract requires specific statutory ingredients recognized by common law and the Kenyan Law of Contract Act (Cap 23).',
        keyPoints: [
          'Offer: A definite, clear statement of terms by offeror indicating readiness to be bound upon acceptance (distinguished from an Invitation to Treat such as price tags or tender advertisements).',
          'Acceptance: Unconditional assent to all terms of the offer. Any modification constitutes a counter-offer which destroys the original offer (Battle of the Forms).',
          'Consideration: The price or value given in return for the promise (quid pro quo). Must be sufficient, though not necessarily adequate.',
          'Intention to Create Legal Relations: Presumed in commercial agreements that parties intend formal legal consequences.',
          'Legal Capacity: Parties must have legal competence (sound mind, age of majority - 18 in Kenya, not an undischarged bankrupt, corporations acting within intra vires powers).',
          'Legality of Object: Contract must not be contrary to public policy or prohibited by statute (e.g. contracts for smuggled contraband are void ab initio).',
        ],
        kenyanLegalContext:
          'Section 135 of PPADA 2015 provides that a public procurement contract must enter into written agreement within the period specified in the notification of award, but not before the expiry of the 14-day standstill period.',
        practicalExample:
          'An advertisement inviting bids in the daily newspapers is merely an "Invitation to Treat". The contractor submitting their bid tender makes the formal "Offer". The entity issuing an award letter and signing the contract forms "Acceptance".',
        examinerTips:
          'KNEC examiners test the distinction between an "Offer" and an "Invitation to Treat". Always cite tender advertisements, display of goods in a shop window, and auction catalogues as examples of invitations to treat.',
      },
      {
        id: 'scm-505-t2',
        title: 'Types of Procurement Contracts & Performance Monitoring',
        summary:
          'Choosing the right contract type allocates financial risk appropriately between buyer and supplier based on scope certainty.',
        keyPoints: [
          'Lump-Sum / Firm-Fixed-Price Contract: Contractor agrees to deliver total defined scope for a fixed single price. Financial risk lies entirely with the contractor.',
          'Cost-Reimbursable (Cost-Plus) Contract: Buyer pays allowable incurred costs plus an agreed fee/profit margin. Used when scope is unpredictable; risk lies primarily with buyer.',
          'Unit Price Contract: Rates are fixed per unit of work (e.g. per cubic meter of excavation), but total quantity is variable. Common in civil engineering.',
          'Framework Agreement: Contract setting unit terms and prices for recurrent supplies (stationery, vehicle fuel) over 1 to 3 years, with actual orders placed via call-off orders.',
          'Performance Guarantees / Bonds: Bank guarantee (typically 10% of contract value) provided by supplier to compensate buyer if supplier defaults on contract obligations.',
        ],
        kenyanLegalContext:
          'PPADA 2015 Section 141 sets requirements for performance securities (not exceeding 10% of contract price) and framework contracting conditions (Section 114).',
        practicalExample:
          'Kenya National Highways Authority (KeNHA) uses unit price contracts for road maintenance, while a county government enters into a 2-year framework contract with local petrol stations for fleet fuel.',
        examinerTips:
          'When asked in KNEC papers why Framework Agreements are advantageous: (1) Reduces repetitive tendering costs, (2) Secures volume discounts, (3) Enables faster call-off turnaround.',
      },
      {
        id: 'scm-505-t3',
        title: 'Breach of Contract, Remedies & Alternative Dispute Resolution (ADR)',
        summary:
          'When contractual obligations fail, law provides established avenues for damages, performance, and non-adversarial dispute resolution.',
        keyPoints: [
          'Actual Breach vs Anticipatory Breach: Actual occurs when performance is missed on due date; anticipatory occurs when a party declares in advance that they will not perform.',
          'Remedies for Breach: Damages (compensatory), Specific Performance (court orders party to perform unique obligation), Injunction (restrains prohibited act), Rescission.',
          'Liquidated Damages: Pre-agreed genuine financial estimate of loss caused by delays (e.g. KES 50,000 per day of delay) written into the contract. Must not be a punitive penalty.',
          'Alternative Dispute Resolution (ADR):',
          '1. Direct Negotiation: Parties resolve grievances informally between themselves.',
          '2. Mediation: Neutral third-party facilitates communication to help parties reach their own voluntary settlement.',
          '3. Arbitration: Neutral arbitrator or tribunal hears evidence and issues a legally binding Arbitral Award enforceable by high court.',
          '4. Litigation: Court lawsuit; expensive, slow, public, and adversarial.',
        ],
        kenyanLegalContext:
          'Arbitration Act 1995 (Laws of Kenya) governs commercial arbitral proceedings. Article 159 of the Kenyan Constitution promotes Alternative Dispute Resolution mechanisms.',
        practicalExample:
          'A contractor building a county cold-room facility is delayed by 30 days. The county invokes the liquidated damages clause deducting KES 10,000 per day from the final certificate.',
        examinerTips:
          'KNEC Section B often asks why organizations prefer ADR (Arbitration/Mediation) over Court Litigation. Highlight: confidentiality, commercial relationship preservation, speed, cost efficiency, and specialist industry expertise of arbitrators.',
      },
    ],
  },
  {
    id: 'scm-506',
    code: 'SCM506',
    title: 'Supply Chain Ethics, Governance & Quality',
    level: 'Level 5 (Craft Certificate)',
    accreditation: 'KNEC & TVET CDACC Accredited',
    nominalHours: 45,
    iconName: 'ShieldCheck',
    color: 'emerald',
    summary:
      'Professional code of ethics (KISM / CIPS), anti-corruption measures under EACC and PPRA, conflict of interest declaration, Total Quality Management (TQM), and KEBS standards.',
    learningOutcomes: [
      'Apply professional procurement codes of ethics and governance frameworks.',
      'Identify and mitigate corruption risks, bid rigging, and conflict of interest.',
      'Comply with the Supplies Practitioners Management Act (SPMA 2007) licensing requirements.',
      'Understand Total Quality Management (TQM) principles across procurement processes.',
      'Implement Kenya Bureau of Standards (KEBS) conformity assessment procedures.',
    ],
    subTopics: [
      {
        id: 'scm-506-t1',
        title: 'Ethics, Integrity & Professional Conduct (KISM & CIPS)',
        summary:
          'Procurement practitioners manage large sums of financial resources, necessitating the highest standards of probity, accountability, and ethical discipline.',
        keyPoints: [
          'Core Ethical Principles: Honesty and integrity, professional competence, confidentiality, transparency, fairness, and accountability.',
          'Conflict of Interest: A situation where personal, familial, or financial interests interfere with objective official duties. Must be disclosed immediately, requiring recusal from the procurement committee.',
          'Gifts and Hospitality Policy: Accepting gifts, entertainment, or travel discounts from prospective bidders compromises impartiality. In public sector, gifts must be recorded in the entity gift register or declined.',
          'Bid Rigging & Collusion: Illegal cartels where suppliers agree among themselves who wins a tender (e.g. cover bidding, bid rotation, market allocation).',
          'Whistleblower Protection: Safe statutory channels for employees to report procurement fraud without fear of retaliation.',
        ],
        kenyanLegalContext:
          'Supplies Practitioners Management Act (SPMA 2007) mandates that all procurement practitioners in Kenya must be registered and licensed by the Kenya Institute of Supplies Management (KISM). Operating without a KISM practicing license is an offence.',
        practicalExample:
          'A procurement officer whose brother owns a registered stationery business must submit a formal declaration of interest and recuse himself when the Tender Evaluation Committee assesses stationery bids.',
        examinerTips:
          'KNEC questions frequently test the mandate of KISM: registration of practitioners, setting professional standards, training, disciplining errant members, and issuing annual practicing licenses.',
      },
      {
        id: 'scm-506-t2',
        title: 'Anti-Corruption Frameworks (PPRA, EACC & Debarment)',
        summary:
          'Kenyan governance institutions oversee enforcement of procurement integrity and penalize corrupt misconduct.',
        keyPoints: [
          'Public Procurement Regulatory Authority (PPRA): Monitors public procurement, ensures compliance with PPADA 2015, carries out procurement audits, investigates complaints, and maintains list of debarred firms.',
          'Public Procurement Administrative Review Board (PPARB): Independent quasi-judicial tribunal hearing appeals from aggrieved bidders within the 14-day statutory standstill window.',
          'Ethics and Anti-Corruption Commission (EACC): Investigates criminal procurement corruption, economic crimes, bribery, and recovers stolen public assets.',
          'Debarment of Contractors: Under Section 41 of PPADA, PPRA can debar a contractor from participating in public procurement for up to 5 years for offenses like fraud, forged documents, tax evasion, or poor contract execution.',
        ],
        kenyanLegalContext:
          'Anti-Corruption and Economic Crimes Act (ACECA 2003) and Leadership and Integrity Act (2012) establish severe criminal penalties, including 10 years imprisonment and fines equal to double the corrupt benefit received.',
        practicalExample:
          'A firm submitting forged tax compliance certificates from KRA in a county tender is disqualified, reported to EACC, and debarred by PPRA from all government tenders for 3 years.',
        examinerTips:
          'Do not confuse PPRA with PPARB in KNEC examinations. PPRA is the regulatory body (policy, audit, debarment), whereas PPARB is the administrative review board (hearings of tender disputes).',
      },
      {
        id: 'scm-506-t3',
        title: 'Quality Management & Standards (TQM, ISO & KEBS)',
        summary:
          'Quality assurance prevents defective inputs from compromising end-product reliability and customer satisfaction.',
        keyPoints: [
          'Total Quality Management (TQM): Organization-wide management philosophy focused on continuous improvement (Kaizen), customer focus, employee empowerment, and zero defects.',
          'ISO 9001: International standard for Quality Management Systems (QMS) ensuring consistent processes, customer satisfaction, and documented procedures.',
          'Kenya Bureau of Standards (KEBS): National standards body responsible for preparing national standards (KS), metrology, testing, and product certification.',
          'Standardization Marks in Kenya: Standardization Mark (SM) for locally manufactured products, Diamond Mark of Quality for exceptional excellence, and Import Standardization Mark (ISM) for imported goods.',
          'Pre-Export Verification of Conformity (PVoC): Overseas inspection system to ensure imported goods meet Kenyan safety and health standards before shipping.',
        ],
        kenyanLegalContext:
          'Standards Act (Cap 496 Laws of Kenya) prohibits the importation, manufacture, or sale of goods that do not conform to approved Kenya Standards.',
        practicalExample:
          'A bakery sourcing baking flour demands proof of KEBS Standardization Mark and ISO 22000 Food Safety certification from milling suppliers.',
        examinerTips:
          'When KNEC asks for the benefits of standardization in purchasing: (1) Facilitates competitive bidding with clear specs, (2) Reduces inventory variety and holding costs, (3) Ensures interchangeability of parts.',
      },
    ],
  },
  {
    id: 'scm-507',
    code: 'SCM507',
    title: 'Supply Market Research & Forecasting',
    level: 'Level 5 (Craft Certificate)',
    accreditation: 'KNEC & TVET CDACC Accredited',
    nominalHours: 50,
    iconName: 'TrendingUp',
    color: 'violet',
    summary:
      'Market research techniques, Kraljic Portfolio Matrix, qualitative and quantitative demand forecasting (moving averages, exponential smoothing), and Supplier Relationship Management (SRM).',
    learningOutcomes: [
      'Conduct supply market analysis using PESTLE and Porter’s Five Forces models.',
      'Segment spend and categorize purchase items using the Kraljic Portfolio Matrix.',
      'Calculate demand forecasts using time-series quantitative techniques (moving averages).',
      'Apply qualitative forecasting methods (Delphi method, sales force composite).',
      'Formulate Supplier Relationship Management (SRM) development strategies.',
    ],
    subTopics: [
      {
        id: 'scm-507-t1',
        title: 'The Kraljic Portfolio Matrix (Spend Segmentation)',
        summary:
          'Peter Kraljic’s matrix classifies corporate purchases into four quadrants based on Profit Impact (financial risk) and Supply Risk (market complexity).',
        keyPoints: [
          'Strategic Items (High Profit Impact, High Supply Risk): Specialized capital equipment, critical raw materials. Strategy: Form collaborative long-term partnerships, joint development, early supplier involvement (ESI).',
          'Bottleneck Items (Low Profit Impact, High Supply Risk): Specialized spare parts, sole-supplier chemicals. Strategy: Ensure supply security, buffer stocking, search for alternative specifications or substitute vendors.',
          'Leverage Items (High Profit Impact, Low Supply Risk): Bulk commodities, fuel, packaging. Multiple suppliers available. Strategy: Exploit purchasing power, volume pooling, competitive tendering, negotiate aggressive pricing.',
          'Routine / Non-Critical Items (Low Profit Impact, Low Supply Risk): Office stationery, general maintenance cleaning items. Strategy: Process simplification, e-procurement catalogues, blanket orders, reduce transaction overhead.',
        ],
        kenyanLegalContext:
          'Helps procurement units structure their Annual Procurement Plan under PPADA 2015 Section 53 to consolidate leverage spend and risk-manage strategic contracts.',
        practicalExample:
          'Kenya Airways categorizes jet fuel as a Leverage item (huge spend, multiple oil marketers), aircraft engines as Strategic items, customized cockpit components as Bottleneck items, and passenger napkins as Routine items.',
        examinerTips:
          'The Kraljic Matrix is a prime KNEC favorite! Memorize the two axes: Horizontal = Supply Risk (Low to High), Vertical = Profit Impact (Low to High). Be ready to draw the 2x2 grid and list the purchasing strategy for each quadrant.',
        diagramOrTable: {
          type: 'matrix',
          title: 'Kraljic Purchasing Matrix Breakdown',
          headers: ['Quadrant', 'Profit Impact', 'Supply Risk', 'Optimal Procurement Strategy'],
          rows: [
            ['Routine Items', 'Low', 'Low', 'Process automation, standard catalogs, reduce transaction costs'],
            ['Leverage Items', 'High', 'Low', 'Competitive bidding, volume aggregation, aggressive negotiation'],
            ['Bottleneck Items', 'Low', 'High', 'Ensure continuity, buffer stocks, develop substitute sources'],
            ['Strategic Items', 'High', 'High', 'Long-term partnership, SRM collaboration, joint risk sharing'],
          ],
        },
      },
      {
        id: 'scm-507-t2',
        title: 'Demand Forecasting: Qualitative & Quantitative Methods',
        summary:
          'Accurate demand forecasting prevents both costly stockouts and excessive dead inventory holding.',
        keyPoints: [
          'Qualitative (Judgmental) Methods: Used when historical data is scarce or for new product launches:',
          '- Delphi Technique: A structured panel of independent experts responds to questionnaires in multiple rounds with anonymous summaries until consensus is reached.',
          '- Sales Force Composite: Aggregating estimates from frontline sales representatives who have direct customer contact.',
          '- Market Research / Customer Surveys: Gathering direct intention data through questionnaires and focus groups.',
          'Quantitative (Time Series) Methods: Based on statistical analysis of historical demand data:',
          '- Simple Moving Average: Calculates the average demand over a fixed number of past periods (e.g. 3-month or 6-month average). Smooths out random fluctuations.',
          '- Weighted Moving Average: Assigns higher weights to more recent periods to reflect current trend.',
          '- Exponential Smoothing: Forecast = Last Period Forecast + alpha * (Last Period Actual - Last Period Forecast).',
        ],
        kenyanLegalContext:
          'Accurate forecasting is required for drafting the statutory Annual Procurement Plan that public entities must submit to National Treasury prior to the beginning of the financial year.',
        practicalExample:
          'A cement manufacturer in Athi River uses a 3-month moving average to forecast limestone demand, but uses the Delphi technique with civil engineers to forecast demand for a new carbon-neutral eco-cement.',
        examinerTips:
          'KNEC calculations on 3-month Simple Moving Average: If demand for Jan, Feb, Mar is 120, 150, 180 units respectively, the April forecast is (120+150+180)/3 = 150 units.',
      },
      {
        id: 'scm-507-t3',
        title: 'Supplier Relationship Management (SRM) & Sourcing Strategies',
        summary:
          'SRM categorizes supplier interactions to maximize mutual value creation, supplier development, and sustainable competitive advantage.',
        keyPoints: [
          'Transactional vs Collaborative Relationships: Transactional is adversarial, arm’s length, price-focused with short-term horizon. Collaborative is trust-based, transparent, sharing information and long-term continuous improvement.',
          'Supplier Appraisal (Carter’s 10 Cs): Competency, Capacity, Commitment, Control, Cash/Financial stability, Cost, Consistency, Culture, Clean (ESG), Communication.',
          'Supplier Development: Active collaboration by the buying organization to upgrade a supplier’s manufacturing capability, quality systems, or delivery reliability.',
          'Single Sourcing vs Multiple Sourcing:',
          '- Single Sourcing: One supplier for total requirement. Higher economies of scale and intimacy, but high vulnerability to disruptions.',
          '- Multiple Sourcing: Splitting orders between multiple vendors. Mitigates risk and sparks price competition, but loses volume discount leverage.',
        ],
        kenyanLegalContext:
          'AGPO guidelines encourage large contractors and public procuring entities to mentor local youth- and women-led suppliers as part of national supplier development programs.',
        practicalExample:
          'East African Breweries Limited (EABL) engages in extensive supplier development with local sorghum farmers in Western Kenya, providing seeds, agronomic advice, and guaranteed purchase contracts.',
        examinerTips:
          'In KNEC essay questions on "Single Sourcing vs Multiple Sourcing", always formulate your answer in a balanced 2-column comparative format showing advantages and disadvantages of each.',
      },
    ],
  },
];
