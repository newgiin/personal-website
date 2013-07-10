var BUZZWORDS = {
adverb: [
   'collaboratively', 'competently', 'continually', 'conveniently', 'credibly', 'distinctively', 'dramatically', 'dynamically', 'efficiently', 
   'energistically', 'enthusiastically', 'globally', 'holisticly', 'interactively', 'intrinsicly', 
   'objectively', 'phosfluorescently', 'proactively', 'professionally', 'progressively', 'quickly', 'rapidiously', 
   'seamlessly', 'synergistically', 'uniquely'
],
verb: [
   'actualize', 'administrate', 'aggregate', 'architect', 'benchmark', 'brand', 'build', 'circle-back', 'communicate', 'conceptualize', 
   'coordinate', 'create', 'cultivate', 'customize', 'deliver', 'deploy', 'develop', 'disintermediate', 'disseminate', 'downsize',
   'drive', 'embrace', 'e-enable', 'empower', 'enable', 'engage', 'enhance', 'envisioneer', 'evisculate', 
   'evolve', 'expedite', 'exploit', 'extend', 'fabricate', 'facilitate', 'fashion', 'formulate', 'foster', 'gamify', 'generate', 
   'grow', 'harness', 'impact', 'implement', 'incentivize', 'incubate', 'initiate', 'innovate', 'integrate', 'iterate', 
   'leverage', 'maintain', 'matrix', 'maximize', 'mesh', 'monetize', 
   'negotiate', 'network', 'optimize', 'orchestrate', 'parallelelize', 
   'productivate', 'productize', 'promote', 'pursue', 'recaptiualize', 
   'reconceptualize', 'redefine', 're-engineer', 'reintermediate', 'reinvent', 'repurpose', 'restore', 'revolutionize', 
   'scale', 'seize', 'simplify', 'strategize', 'streamline', 'supply', 'syndicate', 'synergize', 'synthesize', 'target', 
   'transform', 'transition', 'underwhelm', 'unleash', 'utilize', 'value-add', 'visualize', 'whiteboard'
],
adjective: [
   '24/7', '24/365', 'accelerated', 'accurate', 'adaptive', 'alternative', 'an-expanded-array-of', 'B2B', 'B2C', 'backend', 
   'backward-compatible', 'best-of-breed', 'bleeding-edge', 'bricks-and-clicks', 'business', 'clicks-and-mortar', 
   'client-based', 'client-centered', 'client-centric', 'client-focused', 'collaborative', 'compelling',  'competitive', 
   'cooperative', 'corporate', 'cost-effective', 'covalent', 'cross-functional', 'cross-media', 'cross-platform', 
   'cross-unit', 'customer-directed', 'customized', 'cutting-edge', 'distinctive', 'distributed', 'diverse', 'dynamic', 
   'e-business', 'economically-sound', 'effective', 'efficient', 'emerging', 'empowered', 'enabled', 'end-to-end', 
   'enterprise', 'enterprise-wide', 'equity-invested', 'error-free', 'ethical', 'excellent', 'exceptional', 'extensible', 
   'extensive', 'flexible', 'focused', 'frictionless', 'front-end', 'fully-researched', 'fully-tested', 'functional', 
   'functionalized', 'future-proof', 'global', 'go-forward', 'goal-oriented', 'granular', 'high-standards-in', 'high-level', 
   'high-payoff', 'high-quality', 'holistic', 'impactful', 'inexpensive', 'innovative',
   'installed-base', 'integrated', 'interactive', 'interdependent', 'intermandated', 'interoperable', 'intuitive', 
   'just-in-time', 'leading-edge', 'leveraged', 'long-term-high-impact', 'low-risk-high-yield', 'magnetic', 
   'maintainable', 'market-positioning', 'market-driven', 'mission-critical', 'multidisciplinary', 'multifunctional', 
   'multimedia-based', 'next-generation', 'one-to-one', 'optimal', 'orthogonal', 'out-of-the-box', 
   'pandemic', 'parallel', 'performance-based', 'premier', 'premium', 'principle-centered', 'proactive', 
   'process-centric', 'professional', 'progressive', 'prospective', 'quality', 'real-time', 'reliable', 'resource-sucking', 
   'resource-maximizing', 'resource-leveling', 'revolutionary', 'robust', 'scalable', 'seamless', 'stand-alone',
   'standardized', 'standards-compliant', 'state-of-the-art', 'strategic', 'superior', 'sustainable', 
   'synergistic', 'tactical', 'team-building', 'team-driven', 'technically-sound', 'timely', 'top-line', 'transparent', 
   'turnkey', 'ubiquitous', 'unique', 'user-centric', 'user-friendly', 'value-added', 'vertical', 'viral', 'virtual', 
   'visionary', 'web-enabled', 'world-class', 'worldwide'
],
noun: [
   'action-item', 'alignment', 'analytic', 'application', 'architecture', 'asset', 'bandwidth', 'ballpark-figure', 'benefit',
   'best-practice', 'brand', 'catalyst-for-change', 'channel', 'collaboration', 'co-opetition', 'idea-sharing', 'community', 'content', 
   'convergence', 'core-competency', 'customer-service', 'data', 'diversity', 'deliverable', 'e-business', 'e-commerce', 'e-market', 
   'e-service', 'entitlement', 'enterprise', 'event-horizon', 'experience', 'expertise', 'functionality', 'growth-strategy', 
   'imperative', 'infomediary', 'infrastructure', 'initiative', 'innovation', 
   'interface', 'leadership', 'low-hanging-fruit', 
   'market', 'material', 'meta-service', 'methodology', 'methods-of-empowerment', 'metric', 
   'mindshare', 'model', 'network', 'next-step', 'niche', 'niche-market', 'opportunity', '"outside-the-box" thinking', 
   'paradigm', 'partnership', 'platform', 'portal', 'potentiality', 'process-improvement', 'process', 'product', 
   'quality-vector', 'relationship', 'resource', 'result', 'ROI', 'scenario', 'schema', 'service', 'solution',
   'source', 'supply-chain', 'synergy', 'system', 'technology', 
   'testing-procedure', 'total-linkage', 'user', 'value', 'visibility', 'web-readiness', 'web-service'
],
nouns: [
       'action-items', 'alignments', 'analytics', 'applications', 'architectures', 'assets', 'bandwidth', 'ballpark-figures', 'benefits',
       'best-practices', 'brands', 'catalysts-for-change', 'channels', 'collaborations', 'communities', 'content', 
       'convergences', 'core-competencies', 'data', 'diversity', 'deliverables', 'e-business', 'e-markets', 
       'e-services', 'entitlements', 'enterprises', 'event-horizons', 'experiences', 'expertise', 'functionalities', 'growth-strategies', 
       'imperatives', 'infomediaries', 'infrastructures', 'initiatives', 
       'interfaces', 'learnings', 'low-hanging-fruits', 
       'markets', 'materials', 'meta-services', 'methodologies', 'methods-of-empowerment', 'metrics', 
       'models', 'networks', 'next-steps', 'niches', 'niche-markets', 'opportunities', 
       'paradigms', 'partnerships', 'platforms', 'portals', 'potentialities', 'process-improvements', 'processes', 'products', 
       'quality-vectors', 'relationships', 'resources', 'results', 'scenarios', 'schemas', 'services', 'solutions',
       'sources', 'supply-chains', 'synergy', 'systems', 'technologies', 
       'testing-procedures', 'users', 'values', 'web-services'
    ]
}
