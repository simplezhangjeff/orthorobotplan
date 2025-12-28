export const news = [
  {
    id: 1,
    title: '国家医保局发布手术机械臂辅助操作收费指南',
    date: '2024-12-25',
    source: '国家医保局',
    tag: '政策',
    tagColor: 'bg-red-100 text-red-700',
    summary: '明确手术机械臂辅助操作费分为导航、部分执行、精准执行三类,为骨科机器人手术收费提供政策依据。',
    isHot: true
  },
  {
    id: 2,
    title: 'Stryker MAKO系统完成全球第100万例手术',
    date: '2024-12-20',
    source: '医疗器械新闻',
    tag: '里程碑',
    tagColor: 'bg-blue-100 text-blue-700',
    summary: 'Stryker宣布其MAKO机器人辅助手术系统已在全球完成第100万例关节置换手术，标志着骨科机器人技术的重大突破。'
  },
  {
    id: 3,
    title: '国家药监局批准天智航新一代骨科机器人上市',
    date: '2024-12-18',
    source: '国家药监局',
    tag: '政策',
    tagColor: 'bg-red-100 text-red-700',
    summary: '天智航医疗科技公司获得国家药品监督管理局批准，其新一代TiRobot骨科手术机器人正式获批上市。'
  },
  {
    id: 4,
    title: '元化智能完成C轮融资，加速AI骨科机器人研发',
    date: '2024-12-15',
    source: '投资界',
    tag: '融资',
    tagColor: 'bg-green-100 text-green-700',
    summary: '元化智能宣布完成5亿元C轮融资，本轮融资将用于加速AI辅助骨科手术机器人的研发和市场推广。'
  },
  {
    id: 5,
    title: 'Zimmer Biomet发布ROSA膝关节系统临床数据',
    date: '2024-12-12',
    source: 'Orthopedic News',
    tag: '临床',
    tagColor: 'bg-purple-100 text-purple-700',
    summary: '最新临床研究显示，ROSA膝关节系统在全膝置换手术中展现出优异的精确度和患者满意度。'
  },
  {
    id: 6,
    title: '北京协和医院完成首例国产机器人辅助髋关节置换',
    date: '2024-12-10',
    source: '健康报',
    tag: '临床',
    tagColor: 'bg-purple-100 text-purple-700',
    summary: '北京协和医院骨科团队使用国产骨科机器人成功完成首例全髋关节置换手术，手术精度达到国际领先水平。'
  }
];

export const faqs = [
  {
    q: '骨科机器人手术安全吗？',
    a: '骨科机器人手术已在全球完成数百万例，安全性经过充分验证。机器人辅助可提高手术精度，降低人为误差，减少并发症风险。'
  },
  {
    q: '机器人手术费用医保能报销吗？',
    a: '部分国产机器人手术已纳入医保，进口机器人根据各地政策不同。2024年医保局发布收费指南后，各地正在逐步规范收费标准。'
  },
  {
    q: '机器人手术恢复时间多久？',
    a: '通常比传统手术恢复更快。关节置换一般2-4周可下地行走，具体因个人情况而异。'
  },
  {
    q: '哪些患者适合机器人手术？',
    a: '大多数需要关节置换的患者都适合，但需由医生根据具体病情评估。严重骨质疏松、特殊解剖结构或翻修手术可能需要特别考虑。'
  },
  {
    q: '国产和进口机器人有什么区别？',
    a: '进口机器人临床验证时间更长、文献更多；国产机器人性价比高、售后服务更便捷。疗效方面，主流产品差异不大，建议根据医院配置和医生经验选择。'
  },
  {
    q: '单髁和全膝置换如何选择？',
    a: '单髁置换创伤更小、恢复更快，适合单间室病变且韧带完好的患者；全膝置换适合病变范围广、畸形严重的患者。具体需要医生根据影像和查体综合评估。'
  }
];

export const patientStories = [
  {
    id: 1,
    name: '王女士',
    age: 68,
    surgery: '全膝置换',
    robot: 'MAKO',
    hospital: '北京协和医院',
    recovery: '术后3周下地行走',
    rating: 5,
    comment: '手术创口很小，恢复比预期快很多，现在能正常散步了。',
    date: '2024-11'
  },
  {
    id: 2,
    name: '李先生',
    age: 72,
    surgery: '单髁置换',
    robot: 'ROSA Knee',
    hospital: '上海华山医院',
    recovery: '术后2周出院',
    rating: 5,
    comment: '微创手术，疼痛比想象中轻，医生很专业。',
    date: '2024-10'
  },
  {
    id: 3,
    name: '张女士',
    age: 65,
    surgery: '全髋置换',
    robot: '元化智能',
    hospital: '上海六院',
    recovery: '术后4周恢复日常',
    rating: 4,
    comment: '国产机器人效果不错，费用也比较合理。',
    date: '2024-12'
  },
  {
    id: 4,
    name: '陈先生',
    age: 58,
    surgery: '全膝置换',
    robot: 'HURWA',
    hospital: '北医三院',
    recovery: '术后3周独立行走',
    rating: 5,
    comment: '主动式机械臂手术很精准，术后膝关节活动度很好。',
    date: '2024-11'
  }
];

export const surgicalTips = [
  {
    title: '术前准备',
    tips: [
      '完成术前检查（血常规、心电图、影像等）',
      '术前2周停用抗凝药物',
      '完善膝/髋关节CT或MRI检查',
      '练习深呼吸和咳嗽技巧',
      '准备助行器或拐杖'
    ]
  },
  {
    title: '术后康复',
    tips: [
      '术后当天开始踝泵运动',
      '早期进行关节屈伸训练',
      '遵医嘱进行康复训练',
      '注意伤口清洁干燥',
      '定期复查X光片'
    ]
  },
  {
    title: '出院后注意',
    tips: [
      '避免深蹲和跪姿',
      '髋关节术后避免盘腿坐',
      '3个月内避免剧烈运动',
      '按时服用抗凝/止痛药物',
      '如有红肿发热及时就医'
    ]
  }
];

export const cities = [
  { id: 'beijing', name: '北京', tier: 1 },
  { id: 'shanghai', name: '上海', tier: 1 },
  { id: 'guangzhou', name: '广州', tier: 1 },
  { id: 'shenzhen', name: '深圳', tier: 1 },
  { id: 'hangzhou', name: '杭州', tier: 2 },
  { id: 'nanjing', name: '南京', tier: 2 },
  { id: 'chengdu', name: '成都', tier: 2 },
  { id: 'wuhan', name: '武汉', tier: 2 }
];

export const anatomyEducation = {
  uka: {
    name: '单髁置换术',
    subtitle: 'Unicompartmental Knee Arthroplasty',
    description: '仅置换膝关节受损的单侧间室，保留健康骨骼和韧带',
    suitable: ['单侧间室骨关节炎', '内翻或外翻畸形<15°', '韧带功能完好'],
    notSuitable: ['炎性关节炎', '严重畸形', '韧带功能不全'],
    advantages: ['创伤小，切口仅6-8cm', '保留更多自体骨', '本体感觉保留好', '恢复快，2周可行走'],
    duration: '45-60分钟',
    recovery: '2-3周',
    lifespan: '15-20年',
    steps: [
      { title: '术前评估', desc: 'CT扫描建立3D模型，AI规划手术方案', icon: '📋' },
      { title: '精准定位', desc: '机器人导航定位，误差<1mm', icon: '🎯' },
      { title: '精确截骨', desc: '机械臂辅助截骨，保护健康组织', icon: '⚙️' },
      { title: '假体安装', desc: '植入匹配假体，恢复关节功能', icon: '🦿' }
    ]
  },
  tka: {
    name: '全膝关节置换术',
    subtitle: 'Total Knee Arthroplasty',
    description: '置换整个膝关节表面，重建关节功能',
    suitable: ['重度膝关节骨关节炎', '类风湿性关节炎', '创伤性关节炎', '严重畸形'],
    notSuitable: ['活动性感染', '严重骨质疏松', '神经肌肉疾病'],
    advantages: ['彻底解决疼痛', '纠正严重畸形', '恢复关节功能', '技术成熟可靠'],
    duration: '60-90分钟',
    recovery: '3-4周',
    lifespan: '20-25年',
    steps: [
      { title: '术前规划', desc: 'CT重建膝关节，个性化手术计划', icon: '📋' },
      { title: '导航注册', desc: '建立坐标系，实时追踪骨骼位置', icon: '🎯' },
      { title: '股骨截骨', desc: '机器人引导精确切割股骨端', icon: '⚙️' },
      { title: '胫骨截骨', desc: '精准处理胫骨平台', icon: '🔧' },
      { title: '假体植入', desc: '安装股骨、胫骨、髌骨假体组件', icon: '🦿' }
    ]
  },
  tha: {
    name: '全髋关节置换术',
    subtitle: 'Total Hip Arthroplasty',
    description: '置换髋臼和股骨头，重建髋关节功能',
    suitable: ['髋关节骨关节炎', '股骨头坏死', '髋关节发育不良', '类风湿累及髋关节'],
    notSuitable: ['活动性感染', '严重心肺疾病', '无法配合康复'],
    advantages: ['消除疼痛', '恢复活动能力', '改善生活质量', '假体寿命长'],
    duration: '60-90分钟',
    recovery: '2-4周',
    lifespan: '20-30年',
    steps: [
      { title: '术前CT规划', desc: '精确测量髋臼角度和股骨偏心距', icon: '📋' },
      { title: '髋臼处理', desc: '机器人辅助磨削髋臼至最佳角度', icon: '🎯' },
      { title: '股骨处理', desc: '精确截骨，保留最大骨量', icon: '⚙️' },
      { title: '假体安装', desc: '植入髋臼杯和股骨柄假体', icon: '🦿' }
    ]
  }
};

export const pricingPolicies = [
  {
    id: 32,
    name: '手术路径导航辅助操作费',
    description: '通过融合医学影像、计算机定位追踪及实时反馈等技术，术中实时显示手术路径与靶点，并提供必要的操作指导。',
    unit: '次',
    category: 'navigation'
  },
  {
    id: 33,
    name: '手术机械臂辅助操作费（导航）',
    description: '利用手术机械臂平台，操控手术器械，参与导航、定位等引导操作。',
    unit: '次',
    category: 'robot',
    note: '不与手术路径导航辅助操作费同时收取'
  },
  {
    id: 34,
    name: '手术机械臂辅助操作费（部分执行）',
    description: '利用手术机械臂平台，操控手术器械，参与打孔、切开等一般手术操作。',
    unit: '次',
    category: 'robot',
    note: '不与手术路径导航辅助操作费同时收取'
  },
  {
    id: 35,
    name: '手术机械臂辅助操作费（精准执行）',
    description: '利用手术机械臂平台，操控手术器械，完成器官、软组织或硬组织的切除、重建、修复、平衡等操作，参与关键或者全部手术过程。',
    unit: '次',
    category: 'robot',
    note: '骨科机器人关节置换手术主要适用此项'
  },
  {
    id: 1,
    name: '医学3D重建辅助操作费',
    description: '通过数字技术、人工智能技术等将患者影像检查结果构建虚拟3D模型，满足术前规划、导板设计、手术预演等需要。',
    unit: '件',
    category: '3d'
  }
];
