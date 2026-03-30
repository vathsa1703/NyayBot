// ============================================================
// server/rag/chunks.js
// ONE JOB: Store all law chunks from CPA 2019 and E-Commerce Rules 2020
// These are manually extracted and cleaned from the official PDFs
// ============================================================

export const LAW_CHUNKS = [

  // ════════════════════════════════════════════════════════
  // CONSUMER PROTECTION ACT 2019 — KEY DEFINITIONS
  // ════════════════════════════════════════════════════════

  {
    id: "CPA_2_7",
    source: "Consumer Protection Act 2019",
    section: "Section 2(7)",
    title: "Definition of Consumer",
    text: `Section 2(7) of Consumer Protection Act 2019: "consumer" means any person who buys any goods for a consideration which has been paid or promised or partly paid and partly promised, or under any system of deferred payment and includes any user of such goods other than the person who buys such goods for consideration paid or promised or partly paid or partly promised, or under any system of deferred payment, when such use is made with the approval of such person, but does not include a person who obtains such goods for resale or for any commercial purpose; or hires or avails of any service for a consideration which has been paid or promised or partly paid and partly promised, or under any system of deferred payment. The expression "buys any goods" and "hires or avails any services" includes offline or online transactions through electronic means or by teleshopping or direct selling or multi-level marketing.`,
    keywords: ["consumer", "buyer", "online purchase", "goods", "services", "consideration"]
  },

  {
    id: "CPA_2_10",
    source: "Consumer Protection Act 2019",
    section: "Section 2(10)",
    title: "Definition of Defect",
    text: `Section 2(10) of Consumer Protection Act 2019: "defect" means any fault, imperfection or shortcoming in the quality, quantity, potency, purity or standard which is required to be maintained by or under any law for the time being in force or under any contract, express or implied or as is claimed by the trader in any manner whatsoever in relation to any goods or product and the expression "defective" shall be construed accordingly.`,
    keywords: ["defect", "defective", "fault", "imperfection", "quality", "damaged goods", "product defect"]
  },

  {
    id: "CPA_2_11",
    source: "Consumer Protection Act 2019",
    section: "Section 2(11)",
    title: "Definition of Deficiency in Service",
    text: `Section 2(11) of Consumer Protection Act 2019: "deficiency" means any fault, imperfection, shortcoming or inadequacy in the quality, nature and manner of performance which is required to be maintained by or under any law for the time being in force or has been undertaken to be performed by a person in pursuance of a contract or otherwise in relation to any service and includes any act of negligence or omission or commission by such person which causes loss or injury to the consumer; and deliberate withholding of relevant information by such person to the consumer.`,
    keywords: ["deficiency", "service deficiency", "negligence", "poor service", "refund not processed", "delivery not received", "omission"]
  },

  {
    id: "CPA_2_47",
    source: "Consumer Protection Act 2019",
    section: "Section 2(47)",
    title: "Definition of Unfair Trade Practice",
    text: `Section 2(47) of Consumer Protection Act 2019: "unfair trade practice" means a trade practice which, for the purpose of promoting the sale, use or supply of any goods or for the provision of any service, adopts any unfair method or unfair or deceptive practice including: making any statement whether orally or in writing or by visible representation which falsely represents that the goods are of a particular standard, quality, quantity, grade, composition, style or model; falsely represents that the services are of a particular standard, quality or grade; represents that the goods or services have sponsorship, approval, performance, characteristics, accessories, uses or benefits which such goods or services do not have; makes a false or misleading representation concerning the need for, or the usefulness of, any goods or services; refusing after selling goods or rendering services to take back or withdraw defective goods or to withdraw or discontinue deficient services and to refund the consideration thereof within a period of thirty days.`,
    keywords: ["unfair trade practice", "misleading", "false representation", "refund refused", "deceptive", "overcharging"]
  },

  {
    id: "CPA_2_6",
    source: "Consumer Protection Act 2019",
    section: "Section 2(6)",
    title: "Definition of Complaint",
    text: `Section 2(6) of Consumer Protection Act 2019: "complaint" means any allegation in writing, made by a complainant for obtaining any relief provided by or under this Act, that an unfair contract or unfair trade practice or a restrictive trade practice has been adopted by any trader or service provider; the goods bought by him suffer from one or more defects; the services hired or availed of by him suffer from any deficiency; a trader or a service provider has charged for the goods or for the services a price in excess of the price fixed by or under any law or displayed on the goods or agreed between the parties; the goods which are hazardous to life and safety are being offered for sale.`,
    keywords: ["complaint", "allegation", "defect", "deficiency", "overcharging", "hazardous"]
  },

  {
    id: "CPA_2_9",
    source: "Consumer Protection Act 2019",
    section: "Section 2(9)",
    title: "Consumer Rights",
    text: `Section 2(9) of Consumer Protection Act 2019: "consumer rights" includes the right to be protected against the marketing of goods, products or services which are hazardous to life and property; the right to be informed about the quality, quantity, potency, purity, standard and price of goods, products or services so as to protect the consumer against unfair trade practices; the right to be assured, wherever possible, access to a variety of goods, products or services at competitive prices; the right to be heard and to be assured that consumer's interests will receive due consideration at appropriate fora; the right to seek redressal against unfair trade practice or restrictive trade practices or unscrupulous exploitation of consumers; and the right to consumer awareness.`,
    keywords: ["consumer rights", "right to information", "right to redressal", "right to be heard", "protection"]
  },

  // ════════════════════════════════════════════════════════
  // FILING COMPLAINTS — DISTRICT COMMISSION
  // ════════════════════════════════════════════════════════

  {
    id: "CPA_34",
    source: "Consumer Protection Act 2019",
    section: "Section 34",
    title: "Jurisdiction of District Commission",
    text: `Section 34 of Consumer Protection Act 2019: The District Commission shall have jurisdiction to entertain complaints where the value of the goods or services paid as consideration does not exceed one crore rupees. A complaint shall be instituted in a District Commission within the local limits of whose jurisdiction the opposite party at the time of the institution of the complaint, ordinarily resides or carries on business or has a branch office or personally works for gain; or the cause of action, wholly or in part, arises; or the complainant resides or personally works for gain.`,
    keywords: ["District Commission", "jurisdiction", "file complaint", "1 crore", "where to file", "forum"]
  },

  {
    id: "CPA_35",
    source: "Consumer Protection Act 2019",
    section: "Section 35",
    title: "How to File a Complaint",
    text: `Section 35 of Consumer Protection Act 2019: A complaint, in relation to any goods sold or delivered or agreed to be sold or delivered or any service provided or agreed to be provided, may be filed with a District Commission by the consumer to whom such goods are sold or delivered or such service is provided; or who alleges unfair trade practice in respect of such goods or service. The complaint under this sub-section may be filed electronically. Every complaint filed shall be accompanied with such fee and payable in such manner, including electronic form, as may be prescribed.`,
    keywords: ["file complaint", "District Commission", "how to complain", "consumer forum", "electronically"]
  },

  {
    id: "CPA_36",
    source: "Consumer Protection Act 2019",
    section: "Section 36",
    title: "Admissibility of Complaint",
    text: `Section 36 of Consumer Protection Act 2019: On receipt of a complaint made under section 35, the District Commission may, by order, admit the complaint for being proceeded with or reject the same. A complaint shall not be rejected unless an opportunity of being heard has been given to the complainant. The admissibility of the complaint shall ordinarily be decided within twenty-one days from the date on which the complaint was filed. Where the District Commission does not decide the issue of admissibility within the period so specified, it shall be deemed to have been admitted.`,
    keywords: ["admissibility", "complaint admitted", "21 days", "hearing", "District Commission process"]
  },

  {
    id: "CPA_38",
    source: "Consumer Protection Act 2019",
    section: "Section 38",
    title: "Procedure on Admission of Complaint",
    text: `Section 38 of Consumer Protection Act 2019: The District Commission shall, on admission of a complaint, refer a copy of the admitted complaint within twenty-one days from the date of its admission to the opposite party directing him to give his version of the case within a period of thirty days or such extended period not exceeding fifteen days. Every complaint shall be disposed of as expeditiously as possible and endeavour shall be made to decide the complaint within a period of three months from the date of receipt of notice by opposite party where the complaint does not require analysis or testing of commodities and within five months if it requires analysis or testing of commodities.`,
    keywords: ["procedure", "opposite party", "30 days response", "3 months", "disposal", "hearing process"]
  },

  {
    id: "CPA_39",
    source: "Consumer Protection Act 2019",
    section: "Section 39",
    title: "Relief and Remedies Available",
    text: `Section 39 of Consumer Protection Act 2019: Where the District Commission is satisfied that the goods complained against suffer from any defects or that any of the allegations contained in the complaint about the services or any unfair trade practices are proved, it shall issue an order to the opposite party directing him to: remove the defect pointed out from the goods in question; replace the goods with new goods of similar description which shall be free from any defect; return to the complainant the price or charges paid by the complainant along with such interest; pay such amount as compensation to the consumer for any loss or injury suffered due to the negligence of the opposite party; remove the defects in goods or deficiencies in the services; discontinue the unfair trade practice and not repeat them; pay punitive damages in such circumstances as it deems fit.`,
    keywords: ["relief", "remedy", "compensation", "refund", "replacement", "damages", "order", "what consumer gets"]
  },

  {
    id: "CPA_41",
    source: "Consumer Protection Act 2019",
    section: "Section 41",
    title: "Appeal Against District Commission Order",
    text: `Section 41 of Consumer Protection Act 2019: Any person aggrieved by an order made by the District Commission may prefer an appeal against such order to the State Commission on the grounds of facts or law within a period of forty-five days from the date of the order. The State Commission may entertain an appeal after the expiry of the said period of forty-five days, if it is satisfied that there was sufficient cause for not filing it within that period. No appeal by a person who is required to pay any amount in terms of an order of the District Commission shall be entertained by the State Commission unless the appellant has deposited fifty per cent of that amount.`,
    keywords: ["appeal", "State Commission", "45 days", "aggrieved", "appeal process"]
  },

  {
    id: "CPA_47",
    source: "Consumer Protection Act 2019",
    section: "Section 47",
    title: "Jurisdiction of State Commission",
    text: `Section 47 of Consumer Protection Act 2019: The State Commission shall have jurisdiction to entertain complaints where the value of the goods or services paid as consideration exceeds rupees one crore but does not exceed rupees ten crore. A complaint shall be instituted in a State Commission within the limits of whose jurisdiction the opposite party at the time of institution of the complaint ordinarily resides or carries on business or has a branch office; or the cause of action, wholly or in part, arises; or the complainant resides or personally works for gain.`,
    keywords: ["State Commission", "jurisdiction", "1 crore to 10 crore", "high value complaint"]
  },

  {
    id: "CPA_58",
    source: "Consumer Protection Act 2019",
    section: "Section 58",
    title: "Jurisdiction of National Commission",
    text: `Section 58 of Consumer Protection Act 2019: The National Commission shall have jurisdiction to entertain complaints where the value of the goods or services paid as consideration exceeds rupees ten crore. The National Commission shall also entertain appeals against the orders of any State Commission and appeals against the orders of the Central Authority.`,
    keywords: ["National Commission", "jurisdiction", "above 10 crore", "national level"]
  },

  {
    id: "CPA_69",
    source: "Consumer Protection Act 2019",
    section: "Section 69",
    title: "Limitation Period for Filing Complaint",
    text: `Section 69 of Consumer Protection Act 2019: The District Commission, the State Commission or the National Commission shall not admit a complaint unless it is filed within two years from the date on which the cause of action has arisen. A complaint may be entertained after the period of two years if the complainant satisfies the Commission that he had sufficient cause for not filing the complaint within such period. No such complaint shall be entertained unless the Commission records its reasons for condoning such delay.`,
    keywords: ["limitation period", "2 years", "time limit", "when to file", "delay condonation"]
  },

  {
    id: "CPA_72",
    source: "Consumer Protection Act 2019",
    section: "Section 72",
    title: "Penalty for Non-Compliance of Order",
    text: `Section 72 of Consumer Protection Act 2019: Whoever fails to comply with any order made by the District Commission or the State Commission or the National Commission shall be punishable with imprisonment for a term which shall not be less than one month but which may extend to three years, or with fine which shall not be less than twenty-five thousand rupees but which may extend to one lakh rupees, or with both.`,
    keywords: ["penalty", "non-compliance", "imprisonment", "fine", "punishment", "contempt"]
  },

  {
    id: "CPA_88",
    source: "Consumer Protection Act 2019",
    section: "Section 88",
    title: "Penalty for Non-Compliance of Central Authority Direction",
    text: `Section 88 of Consumer Protection Act 2019: Whoever fails to comply with any direction of the Central Authority under sections 20 and 21 shall be punished with imprisonment for a term which may extend to six months or with fine which may extend to twenty lakh rupees, or with both.`,
    keywords: ["penalty", "Central Authority", "20 lakh fine", "punishment"]
  },

  {
    id: "CPA_89",
    source: "Consumer Protection Act 2019",
    section: "Section 89",
    title: "Punishment for False or Misleading Advertisement",
    text: `Section 89 of Consumer Protection Act 2019: Any manufacturer or service provider who causes a false or misleading advertisement to be made which is prejudicial to the interest of consumers shall be punished with imprisonment for a term which may extend to two years and with fine which may extend to ten lakh rupees; and for every subsequent offence, be punished with imprisonment for a term which may extend to five years and with fine which may extend to fifty lakh rupees.`,
    keywords: ["misleading advertisement", "false advertisement", "punishment", "10 lakh fine", "manufacturer liability"]
  },

  // ════════════════════════════════════════════════════════
  // PRODUCT LIABILITY
  // ════════════════════════════════════════════════════════

  {
    id: "CPA_84",
    source: "Consumer Protection Act 2019",
    section: "Section 84",
    title: "Liability of Product Manufacturer",
    text: `Section 84 of Consumer Protection Act 2019: A product manufacturer shall be liable in a product liability action, if the product contains a manufacturing defect; or the product is defective in design; or there is a deviation from manufacturing specifications; or the product does not conform to the express warranty; or the product fails to contain adequate instructions of correct usage to prevent any harm or any warning regarding improper or incorrect usage. A product manufacturer shall be liable in a product liability action even if he proves that he was not negligent or fraudulent in making the express warranty of a product.`,
    keywords: ["product liability", "manufacturer liability", "manufacturing defect", "design defect", "warranty breach", "defective product"]
  },

  {
    id: "CPA_86",
    source: "Consumer Protection Act 2019",
    section: "Section 86",
    title: "Liability of Product Seller",
    text: `Section 86 of Consumer Protection Act 2019: A product seller who is not a product manufacturer shall be liable in a product liability action, if he has exercised substantial control over the designing, testing, manufacturing, packaging or labelling of a product that caused harm; or he has altered or modified the product and such alteration or modification was the substantial factor in causing the harm; or the product has been sold by him and the identity of product manufacturer of such product is not known; or he failed to exercise reasonable care in assembling, inspecting or maintaining such product.`,
    keywords: ["product seller liability", "seller responsible", "damaged goods", "seller accountability"]
  },

  // ════════════════════════════════════════════════════════
  // E-COMMERCE RULES 2020
  // ════════════════════════════════════════════════════════

  {
    id: "ECR_4_2",
    source: "Consumer Protection (E-Commerce) Rules 2020",
    section: "Rule 4(2)",
    title: "Mandatory Information E-Commerce Must Display",
    text: `Rule 4(2) of Consumer Protection (E-Commerce) Rules 2020: Every e-commerce entity shall provide the following information in a clear and accessible manner on its platform, displayed prominently to its users: legal name of the e-commerce entity; principal geographic address of its headquarters and all branches; name and details of its website; and contact details like e-mail address, fax, landline and mobile numbers of customer care as well as of grievance officer.`,
    keywords: ["e-commerce disclosure", "contact information", "grievance officer details", "mandatory information", "Flipkart Amazon"]
  },

  {
    id: "ECR_4_4",
    source: "Consumer Protection (E-Commerce) Rules 2020",
    section: "Rule 4(4)",
    title: "Grievance Redressal Mechanism Mandatory",
    text: `Rule 4(4) of Consumer Protection (E-Commerce) Rules 2020: Every e-commerce entity shall establish an adequate grievance redressal mechanism having regard to the number of grievances ordinarily received by such entity from India, and shall appoint a grievance officer for consumer grievance redressal, and shall display the name, contact details, and designation of such officer on its platform.`,
    keywords: ["grievance redressal", "grievance officer", "complaint mechanism", "Flipkart grievance", "Amazon grievance"]
  },

  {
    id: "ECR_4_5",
    source: "Consumer Protection (E-Commerce) Rules 2020",
    section: "Rule 4(5)",
    title: "48 Hour Acknowledgement and 1 Month Resolution",
    text: `Rule 4(5) of Consumer Protection (E-Commerce) Rules 2020: Every e-commerce entity shall ensure that the grievance officer acknowledges the receipt of any consumer complaint within forty-eight hours and redresses the complaint within one month from the date of receipt of the complaint. Failure to acknowledge within 48 hours or resolve within one month constitutes a violation of these rules.`,
    keywords: ["48 hours", "one month resolution", "grievance acknowledgement", "complaint resolution time", "deadline", "Flipkart response time", "Amazon response time"]
  },

  {
    id: "ECR_4_8",
    source: "Consumer Protection (E-Commerce) Rules 2020",
    section: "Rule 4(8)",
    title: "No Cancellation Charges",
    text: `Rule 4(8) of Consumer Protection (E-Commerce) Rules 2020: No e-commerce entity shall impose cancellation charges on consumers cancelling after confirming purchase unless similar charges are also borne by the e-commerce entity, if they cancel the purchase order unilaterally for any reason.`,
    keywords: ["cancellation charges", "cancellation fee", "order cancellation", "no cancellation charge"]
  },

  {
    id: "ECR_4_10",
    source: "Consumer Protection (E-Commerce) Rules 2020",
    section: "Rule 4(10)",
    title: "Refund Must Be Processed as Per RBI Guidelines",
    text: `Rule 4(10) of Consumer Protection (E-Commerce) Rules 2020: Every e-commerce entity shall effect all payments towards accepted refund requests of the consumers as prescribed by the Reserve Bank of India or any other competent authority under any law for the time being in force, within a reasonable period of time, or as prescribed under applicable laws. Failure to process refund within reasonable time is a violation of these rules.`,
    keywords: ["refund", "refund not processed", "payment refund", "RBI guidelines", "refund delay", "money not returned"]
  },

  {
    id: "ECR_5_3",
    source: "Consumer Protection (E-Commerce) Rules 2020",
    section: "Rule 5(3)",
    title: "Marketplace Must Provide Seller Information",
    text: `Rule 5(3) of Consumer Protection (E-Commerce) Rules 2020: Every marketplace e-commerce entity shall provide the following information in a clear and accessible manner: details about the sellers offering goods and services, including the name of their business, their geographic address, customer care number; a ticket number for each complaint lodged through which the consumer can track the status of the complaint; information relating to return, refund, exchange, warranty and guarantee, delivery and shipment, modes of payment, and grievance redressal mechanism.`,
    keywords: ["seller information", "complaint tracking", "ticket number", "return policy", "refund policy", "exchange policy", "marketplace responsibility"]
  },

  {
    id: "ECR_6_3",
    source: "Consumer Protection (E-Commerce) Rules 2020",
    section: "Rule 6(3)",
    title: "Seller Cannot Refuse Refund for Defective Goods",
    text: `Rule 6(3) of Consumer Protection (E-Commerce) Rules 2020: No seller offering goods or services through a marketplace e-commerce entity shall refuse to take back goods, or withdraw or discontinue services purchased or agreed to be purchased, or refuse to refund consideration, if paid, if such goods or services are defective, deficient or spurious, or if the goods or services are not of the characteristics or features as advertised or as agreed to, or if such goods or services are delivered late from the stated delivery schedule. Provided that in the case of late delivery, this sub-rule shall not apply if such late delivery was due to force majeure.`,
    keywords: ["seller refund", "defective goods refund", "seller cannot refuse", "late delivery", "not as advertised", "wrong product"]
  },

  {
    id: "ECR_7_4",
    source: "Consumer Protection (E-Commerce) Rules 2020",
    section: "Rule 7(4)",
    title: "Inventory E-Commerce Cannot Refuse Refund",
    text: `Rule 7(4) of Consumer Protection (E-Commerce) Rules 2020: No inventory e-commerce entity shall refuse to take back goods, or withdraw or discontinue services purchased or agreed to be purchased, or refuse to refund consideration, if paid, if such goods or services are defective, deficient or spurious, or if the goods or services are not of the characteristics or features as advertised or as agreed to, or if such goods or services are delivered late from the stated delivery schedule.`,
    keywords: ["inventory ecommerce", "Amazon refund", "refusal to refund", "defective goods", "product not as described"]
  },

  {
    id: "ECR_8",
    source: "Consumer Protection (E-Commerce) Rules 2020",
    section: "Rule 8",
    title: "Contravention of E-Commerce Rules",
    text: `Rule 8 of Consumer Protection (E-Commerce) Rules 2020: The provisions of the Consumer Protection Act, 2019 (35 of 2019) shall apply for any violation of the provisions of these rules. This means any violation of the E-Commerce Rules 2020 is treated as a violation of the Consumer Protection Act 2019 itself, and the full penalties and remedies under the Act apply.`,
    keywords: ["violation", "contravention", "penalty", "punishment", "CPA applies", "e-commerce violation"]
  },

];

export default LAW_CHUNKS;
