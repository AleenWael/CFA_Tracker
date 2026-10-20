// Component (sub-topic) breakdown of every learning module, keyed by module id.
// Each component is ticked off, with its quiz score, as it is studied.
// FSA and Equities follow Kaplan Schweser's module split (Readings 27–50),
// so each component has its own Kaplan module quiz; the other topics are
// best-guess section lists until they are matched to Kaplan too.
// Ticks and quiz scores are stored by position: when a list changes, the
// tracker's plan version must reset that module's ticks (see migrate()).
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

  // ---------- Financial Statement Analysis (Kaplan Readings 27–38) ----------
  'fsa-1': ['27.1 Financial Statement Roles'],
  'fsa-2': ['28.1 Revenue Recognition','28.2 Expense Recognition','28.3 Nonrecurring Items','28.4 Earnings Per Share','28.5 Ratios and Common-Size Income Statements'],
  'fsa-3': ['29.1 Intangible Assets and Marketable Securities','29.2 Common-Size Balance Sheets'],
  'fsa-4': ['30.1 Cash Flow Introduction and Direct Method CFO','30.2 Indirect Method CFO','30.3 Investing and Financing Cash Flows and IFRS/US GAAP Differences'],
  'fsa-5': ['31.1 Analyzing Statements of Cash Flows II'],
  'fsa-6': ['32.1 Inventory Measurement','32.2 Inflation Impact on FIFO and LIFO','32.3 Presentation and Disclosure'],
  'fsa-7': ['33.1 Intangible Long-Lived Assets','33.2 Impairment and Derecognition','33.3 Long-Term Asset Disclosures'],
  'fsa-8': ['34.1 Leases','34.2 Deferred Compensation and Disclosures'],
  'fsa-9': ['35.1 Differences Between Accounting Profit and Taxable Income','35.2 Deferred Tax Assets and Liabilities','35.3 Tax Rates and Disclosures'],
  'fsa-10': ['36.1 Reporting Quality','36.2 Accounting Choices and Estimates','36.3 Warning Signs'],
  'fsa-11': ['37.1 Introduction to Financial Ratios','37.2 Financial Ratios, Part 1','37.3 Financial Ratios, Part 2','37.4 DuPont Analysis','37.5 Industry-Specific Financial Ratios'],
  'fsa-12': ['38.1 Financial Statement Modeling'],

  // ---------- Corporate Finance ----------
  'cf-1': ['Business structures and features','Public vs private companies','Equity vs debt claims','Listing and ownership structure'],
  'cf-2': ['Shareholder vs stakeholder theory','Stakeholder groups and their interests','ESG factors in investor analysis','Principal–agent relationships'],
  'cf-3': ['Principal–agent conflicts','Governance mechanisms: board, committees, voting','Risks of poor governance','Benefits of effective governance','ESG considerations'],
  'cf-4': ['Working capital approaches','Primary and secondary sources of liquidity','Drags and pulls on liquidity','Liquidity measures and cash conversion cycle','Short-term funding choices','Cost of trade credit'],
  'cf-5': ['Types of capital investments','Capital allocation process','NPV and IRR','Return on invested capital','Capital allocation pitfalls','Real options'],
  'cf-6': ['Factors affecting capital structure','Modigliani–Miller propositions','Cost of financial distress and optimal structure','Pecking order and agency costs','Stakeholder interests and target structure','Weighted average cost of capital'],
  'cf-7': ['Business model features','Pricing models','Business model types','Value chain and competitive position'],

  // ---------- Equities (Kaplan Readings 39–50) ----------
  'eq-1': ['39.1 Public and Private Equity Investments'],
  'eq-2': ['40.1 Rights of Equity Shareholders'],
  'eq-3': ['41.1 Equity Markets and Exchanges','41.2 Equity Indexes and Liquidity Measures'],
  'eq-4': ['42.1 Dividends, Stock Splits, and Share Repurchases','42.2 Return Calculations for Equities'],
  'eq-5': ['43.1 Measures and Models of Equity Value'],
  'eq-6': ['44.1 Cash Flow Metrics','44.2 Valuation Models','44.3 Model Limitations and Preferred Stock Valuation'],
  'eq-7': ['45.1 Price Multiples and Equity Valuation','45.2 Price and Enterprise Value Multiples','45.3 Peer Groups and Multiples-Based Valuation'],
  'eq-8': ['46.1 Financial Statement Forecast Models','46.2 Models Based on Company Characteristics'],
  'eq-9': ['47.1 Industry Analysis Framework','47.2 Porter\'s Five Forces and PESTLE Analysis'],
  'eq-10': ['48.1 Corporate Strategy and Industry Position','48.2 Revenue, Profitability, and Capital'],
  'eq-11': ['49.1 Equity Analyst Research Reports'],
  'eq-12': ['50.1 Estimating the Cost of Equity With the Market Model and CAPM','50.2 Arbitrage Pricing Theory'],

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
