// Component (sub-topic) breakdown of every learning module, keyed by module id.
// Each list follows the main sections of the module so they can be ticked off
// one at a time. Edit freely: add, remove or rename lines to match your
// Kaplan portal. Ticks are stored by position, so keep existing lines in place
// when adding new ones at the end.
window.CFA_COMPONENTS = {
  // ---------- Quantitative Methods ----------
  'qm-1': ['Holding period return','Arithmetic, geometric and harmonic means','Money-weighted vs time-weighted returns','Annualized returns','Continuously compounded returns'],
  'qm-2': ['Gross vs net returns','Pre-tax vs after-tax returns','Real vs nominal returns','Leveraged returns','Returns on different instruments'],
  'qm-3': ['Properties of a valid benchmark','Types of benchmarks','Active return and tracking error','Risk-adjusted performance measures'],
  'qm-4': ['Present and future value of a single cash flow','Annuities and perpetuities','Uneven cash flows','Implied returns and growth rates','Cash flow additivity and no-arbitrage','TVM applied to bonds and equities'],
  'qm-5': ['Central tendency and location (quantiles)','Dispersion: range, MAD, variance, SD, CV','Downside deviation and target semideviation','Skewness and kurtosis','Covariance and correlation'],
  'qm-6': ['Probability concepts and expected value','Uniform and binomial distributions','Normal distribution and z-scores','Lognormal distribution','Student\'s t, chi-square and F','Shortfall risk and safety-first ratio'],
  'qm-7': ['Sampling methods and sampling error','Central limit theorem and standard error','Point and interval estimates','Resampling: bootstrap and jackknife','Hypothesis testing steps, Type I/II errors, p-values','Tests of means, variances and correlation','Parametric vs nonparametric tests'],
  'qm-8': ['Portfolio expected return and variance','Covariance and correlation of asset returns','Diversification effect','Probability trees and conditional expectations','Bayes\' formula'],
  'qm-9': ['Lognormal model of asset prices','Monte Carlo simulation steps','Historical simulation','Bootstrapping','Uses and limitations of simulation'],
  'qm-10': ['Regression model and assumptions','Estimating coefficients (OLS)','ANOVA, R² and standard error of estimate','Hypothesis tests on coefficients','Prediction intervals','Functional forms (log-lin, lin-log, log-log)'],
  'qm-11': ['Big data characteristics','Fintech and alternative data','Machine learning: supervised, unsupervised, deep learning','Overfitting and underfitting','Data processing, visualization and text analytics'],

  // ---------- Portfolio Construction ----------
  'pc-1': ['Major return measures','Historical returns of asset classes','Variance and covariance of returns','Risk aversion and utility','Capital allocation line and optimal portfolio','Efficient frontier and minimum-variance portfolios'],
  'pc-2': ['Capital market theory and the CML','Systematic vs nonsystematic risk','Return-generating models and beta','CAPM and the security market line','Performance measures: Sharpe, Treynor, M², Jensen\'s alpha'],
  'pc-3': ['Portfolio approach and diversification','Portfolio management process','Types of investors and their needs','Asset management industry','Pooled investment products'],
  'pc-4': ['Investment policy statement (IPS)','Return and risk objectives (willingness vs ability)','Constraints: liquidity, horizon, tax, legal, unique','Asset classes and strategic asset allocation','ESG integration in portfolio construction'],
  'pc-5': ['Belief perseverance biases','Information processing biases','Emotional biases','Behavioral finance and market anomalies'],
  'pc-6': ['Risk management framework','Risk governance and risk tolerance','Risk budgeting','Financial vs non-financial risks','Measuring and modifying risk'],

  // ---------- Financial Statement Analysis ----------
  'fsa-1': ['Roles of financial reporting and analysis','Primary financial statements and notes','MD&A, auditor\'s report and other sources','Financial statement analysis framework','Financial reporting standards (IFRS vs US GAAP)'],
  'fsa-2': ['Income statement components and formats','Revenue recognition','Expense recognition','Non-recurring items and accounting changes','Basic and diluted EPS','Common-size analysis and comprehensive income'],
  'fsa-3': ['Balance sheet components and formats','Current assets and current liabilities','Non-current assets: PP&E, intangibles, goodwill','Financial instruments','Non-current liabilities','Equity and statement of changes in equity','Common-size analysis and balance sheet ratios'],
  'fsa-4': ['Operating, investing and financing activities','IFRS vs US GAAP classification','Direct vs indirect method','Linkages between the statements','Preparing the cash flow statement'],
  'fsa-5': ['Converting indirect to direct method','Common-size cash flow analysis','Free cash flow: FCFF and FCFE','Cash flow performance and coverage ratios','Evaluating sources and uses of cash'],
  'fsa-6': ['Cost of inventories','Cost flow methods: FIFO, LIFO, weighted average, specific ID','LIFO reserve and LIFO liquidation','Measurement: lower of cost and NRV, write-downs','Presentation, disclosure and ratio effects'],
  'fsa-7': ['Capitalizing vs expensing (incl. interest, R&D)','Intangible assets and goodwill','Depreciation and amortization methods','Impairment (IFRS vs US GAAP)','Revaluation model and derecognition','Investment property and disclosures'],
  'fsa-8': ['Leases: lessee accounting','Leases: lessor accounting','Defined contribution vs defined benefit pensions','Share-based compensation','Presentation and disclosure'],
  'fsa-9': ['Key terms: taxable income, DTAs and DTLs','Tax base of assets and liabilities','Temporary vs permanent differences','Valuation allowance and tax rate changes','Effective vs statutory tax rate','Presentation and disclosure'],
  'fsa-10': ['Reporting quality vs earnings quality','Conditions for misreporting','Accounting choices and estimates','Earnings and cash flow manipulation','Non-GAAP measures','Warning signs'],
  'fsa-11': ['Analytical tools and techniques','Activity ratios','Liquidity ratios','Solvency ratios','Profitability ratios','DuPont analysis','Industry-specific and credit ratios'],
  'fsa-12': ['Forecasting revenue','Forecasting costs (COGS, SG&A)','Balance sheet and cash flow projections','Behavioral biases in forecasting','Competitive factors (Porter\'s five forces)','Inflation and technological change','Choosing the forecast horizon'],

  // ---------- Corporate Finance ----------
  'cf-1': ['Business structures and features','Public vs private companies','Equity vs debt claims','Listing and ownership structure'],
  'cf-2': ['Shareholder vs stakeholder theory','Stakeholder groups and their interests','ESG factors in investor analysis','Principal–agent relationships'],
  'cf-3': ['Principal–agent conflicts','Governance mechanisms: board, committees, voting','Risks of poor governance','Benefits of effective governance','ESG considerations'],
  'cf-4': ['Working capital approaches','Primary and secondary sources of liquidity','Drags and pulls on liquidity','Liquidity measures and cash conversion cycle','Short-term funding choices','Cost of trade credit'],
  'cf-5': ['Types of capital investments','Capital allocation process','NPV and IRR','Return on invested capital','Capital allocation pitfalls','Real options'],
  'cf-6': ['Factors affecting capital structure','Modigliani–Miller propositions','Cost of financial distress and optimal structure','Pecking order and agency costs','Stakeholder interests and target structure','Weighted average cost of capital'],
  'cf-7': ['Business model features','Pricing models','Business model types','Value chain and competitive position'],

  // ---------- Equities ----------
  'eq-1': ['Common vs preferred shares','Voting and dividend rights','Preferred share features','Public vs private equity','Risk and return of equity securities'],
  'eq-2': ['Equity share classes and dual-class structures','Voting process: proxy and cumulative voting','Cross-border listings and depository receipts','Shareholder rights across jurisdictions'],
  'eq-3': ['Primary markets: IPOs, seasoned offerings, private placements, rights','Secondary markets and order types','Market structures: quote-, order- and brokered','Long, short and margin positions','Execution, validity and clearing'],
  'eq-4': ['Total return: dividends and price change','Return decomposition: growth, multiples, yield','Security market indexes: construction and weighting','Market efficiency forms','Market anomalies'],
  'eq-5': ['Intrinsic value vs market price','Categories of valuation models','Dividends, splits and buybacks','Asset-based valuation'],
  'eq-6': ['Dividend discount model','Gordon growth model','Multistage DDM','Preferred stock valuation','FCFE model','Sustainable growth rate'],
  'eq-7': ['Price multiples: P/E, P/B, P/S, P/CF','Justified multiples from fundamentals','Method of comparables','Enterprise value multiples'],
  'eq-8': ['Revenue forecasting approaches','Operating costs and margins','Capex and balance sheet forecasts','Building pro forma statements','Sensitivity and scenario analysis'],
  'eq-9': ['Industry classification systems','Industry life cycle','Porter\'s five forces','Competitive strategies','Macro and external influences'],
  'eq-10': ['Business model and revenue drivers','Historical performance analysis','Competitive position','Forecasting and scenarios','ESG considerations'],
  'eq-11': ['Elements of an effective research report','Investment thesis and recommendation','Valuation summary and key risks','Professional and regulatory considerations'],
  'eq-12': ['CAPM and cost of equity','Market model and beta estimation','Multifactor models','Applications of factor models'],

  // ---------- Fixed Income ----------
  'fi-1': ['Bond features: issuer, maturity, par, coupon, currency','Bond indenture and covenants','Seniority and collateral','Legal, regulatory and tax considerations'],
  'fi-2': ['Principal repayment structures','Coupon structures (floating, step-up, PIK, index-linked)','Contingency provisions: callable, putable, convertible','Contingent convertible bonds'],
  'fi-3': ['Market segments and classification','Primary markets: public offerings, private placements','Secondary markets and liquidity','Fixed-income indexes and investors'],
  'fi-4': ['Short-term funding: commercial paper, bank loans','Repurchase agreements','Corporate debt profiles and maturities','Long-term corporate bonds and MTNs'],
  'fi-5': ['Sovereign debt: types and auctions','On-the-run vs off-the-run and benchmark yields','Non-sovereign, agency and supranational issuers'],
  'fi-6': ['Pricing with a market discount rate','Price–yield relationships','Pricing with spot rates','Flat price, accrued interest and full price','Matrix pricing'],
  'fi-7': ['Periodicity and annual-equivalent yields','Street convention, true and current yield','Yield-to-call and yield-to-worst','Option-adjusted yield','G-spread, I-spread and Z-spread'],
  'fi-8': ['Quoted margin and discount margin','Floating-rate note valuation','Money market yields: discount vs add-on','Bond-equivalent yield'],
  'fi-9': ['Spot rates','Par rates','Forward rates and implied forwards','Relationships among spot, par and forward curves','Yield curve shapes'],
  'fi-10': ['Sources of return: coupons, reinvestment, capital gains','Investment horizon and interest rate risk','Macaulay duration and horizon matching'],
  'fi-11': ['Macaulay and modified duration','Approximate modified duration','Money duration and PVBP','Properties of duration','Effective duration'],
  'fi-12': ['Convexity and approximate convexity','Price change with duration and convexity','Money convexity','Portfolio duration and convexity'],
  'fi-13': ['Effective duration and convexity for bonds with options','Key rate duration','Empirical duration','Credit spread sensitivity'],
  'fi-14': ['Probability of default and loss given default','Expected loss','Credit ratings and rating agencies','Credit spreads and spread risk','Four Cs of credit analysis'],
  'fi-15': ['Sovereign credit: institutional and economic factors','Fiscal and monetary flexibility','External status','Non-sovereign government debt'],
  'fi-16': ['Corporate credit analysis (four Cs)','Leverage and coverage ratios','Seniority ranking and recovery rates','Notching','Covenants'],
  'fi-17': ['Benefits of securitization','Securitization process and parties','SPV and bankruptcy remoteness','Credit tranching and time tranching','Covered bonds'],
  'fi-18': ['ABS structure and credit enhancement','Credit card receivable ABS','Auto loan ABS','CDOs and CLOs'],
  'fi-19': ['Residential mortgage loans','Prepayment risk: contraction and extension','Mortgage pass-through securities','CMOs: sequential, PAC and support tranches','Commercial MBS'],

  // ---------- Alternative Investments ----------
  'ai-1': ['Characteristics of alternative investments','Direct, co-investing and fund investing','Partnership structures (GP/LP)','Fees: management, incentive, hurdle, high-water mark, clawback'],
  'ai-2': ['Performance appraisal challenges','Return calculations and fee waterfalls','IRR and multiple of invested capital','Custom fee arrangements'],
  'ai-3': ['Private equity strategies: LBO, VC, growth','Private equity exit routes','Private debt: direct lending, mezzanine, distressed','Risk, return and diversification'],
  'ai-4': ['Forms of real estate investment','Real estate valuation approaches','REITs','Infrastructure investment types','Risk and return'],
  'ai-5': ['Commodities and futures returns (roll yield, collateral)','Contango and backwardation','Farmland and timberland','Risk, return and diversification'],
  'ai-6': ['Hedge fund strategies','Fee structures','Funds of funds','Due diligence and risks'],
  'ai-7': ['Distributed ledger technology and blockchain','Cryptocurrencies and tokens','Permissioned vs permissionless networks','Investment forms and risks'],

  // ---------- Economics ----------
  'ec-1': ['Breakeven and shutdown points','Economies and diseconomies of scale','Perfect competition','Monopolistic competition','Oligopoly','Monopoly','Concentration measures (N-firm, HHI)'],
  'ec-2': ['Phases of the business cycle','Credit cycles','Leading, coincident and lagging indicators','Inventory and employment fluctuations','Inflation and unemployment'],
  'ec-3': ['Roles and objectives of fiscal policy','Fiscal tools: spending and taxes','Deficits and national debt','Fiscal multiplier','Implementation challenges and lags'],
  'ec-4': ['Roles of central banks and money creation','Monetary transmission mechanism','Inflation targeting','Limits of monetary policy and QE','Interaction of monetary and fiscal policy'],
  'ec-5': ['Cooperation vs non-cooperation','Globalization vs nationalism','Types of geopolitical risk','Tools of geopolitics','Impact on investments'],
  'ec-6': ['Benefits and costs of trade','Absolute and comparative advantage','Trade restrictions: tariffs, quotas, subsidies','Trade blocs and common markets','International organizations: IMF, WTO, World Bank'],
  'ec-7': ['Capital restrictions','FX market participants','Exchange rate regimes','Exchange rates and the trade balance'],
  'ec-8': ['Spot quotes: direct vs indirect','Cross rates','Forward rates and covered interest parity','Forward points and premium/discount','Percentage changes in currency values'],

  // ---------- Derivatives ----------
  'de-1': ['What derivatives are and their underlyings','Exchange-traded vs OTC derivatives','Central clearing','Market participants'],
  'de-2': ['Forwards','Futures: margin and mark-to-market','Swaps','Options: calls, puts and payoffs','Credit derivatives (CDS)'],
  'de-3': ['Benefits of derivatives','Risks: leverage, counterparty, basis, liquidity','Issuer uses and hedge accounting','Investor uses'],
  'de-4': ['Arbitrage and the law of one price','Replication','Cost of carry: costs and benefits','Forward price with carry'],
  'de-5': ['Pricing vs valuation at initiation','Value during the life and at expiry','Forward rate agreements (FRAs)','Implied forward rates'],
  'de-6': ['Futures vs forward pricing','Mark-to-market and interest rate correlation','Interest rate futures','Basis'],
  'de-7': ['Swaps as a series of forwards','Pricing: the swap rate','Valuation after initiation'],
  'de-8': ['Exercise value, moneyness and time value','Factors affecting option value','Lower and upper bounds','American vs European options'],
  'de-9': ['Put–call parity','Synthetic positions, protective puts and covered calls','Put–call–forward parity','Firm value as an option'],
  'de-10': ['One-period binomial model','Risk-neutral probabilities','Hedge ratio and replicating portfolio','Arbitrage when mispriced'],

  // ---------- Ethics ----------
  'et-1': ['Ethics and ethical decision-making','Professions and professionalism','Trust in the investment industry','Ethical vs legal standards','Challenges to ethical behavior'],
  'et-2': ['CFA Institute Professional Conduct Program','Code of Ethics','Standards of Professional Conduct overview','Sanctions and disciplinary process'],
  'et-3': ['I(A) Knowledge of the Law','I(B) Independence and Objectivity','I(C) Misrepresentation','I(D) Misconduct','I(E) Competence'],
  'et-4': ['II(A) Material Nonpublic Information','II(B) Market Manipulation'],
  'et-5': ['III(A) Loyalty, Prudence and Care','III(B) Fair Dealing','III(C) Suitability','III(D) Performance Presentation','III(E) Preservation of Confidentiality'],
  'et-6': ['IV(A) Loyalty','IV(B) Additional Compensation Arrangements','IV(C) Responsibilities of Supervisors'],
  'et-7': ['V(A) Diligence and Reasonable Basis','V(B) Communication with Clients','V(C) Record Retention'],
  'et-8': ['VI(A) Disclosure of Conflicts','VI(B) Priority of Transactions','VI(C) Referral Fees'],
  'et-9': ['VII(A) Conduct as Participants in CFA Programs','VII(B) Reference to CFA Institute and the Designation'],
  'et-10': ['Case studies: applying the Code and Standards','Identifying violations','Recommended procedures for compliance','Vignette question practice']
};
