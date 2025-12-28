import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, Filter, X, Clock, DollarSign, Award, Hospital, Newspaper, ExternalLink, ChevronRight, MapPin, Phone, Star, HelpCircle, MessageCircle, Share2, Heart, BookOpen, Cpu, Settings, FileText, GraduationCap, Wrench, Shield, Calculator, Users, Activity, Calendar, ThumbsUp, Stethoscope, ClipboardList, Play, Pause, RotateCcw, ChevronLeft, Info, Zap } from 'lucide-react';

const OrthoRobotWeb = () => {
  const [selectedIndication, setSelectedIndication] = useState('all');
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [recoveryFilter, setRecoveryFilter] = useState('all');
  const [cameraFilter, setCameraFilter] = useState('all');
  const [armFilter, setArmFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [showAllNews, setShowAllNews] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showConsult, setShowConsult] = useState(false);
  const [showTrainingContact, setShowTrainingContact] = useState(false);
  const [showPolicyDetail, setShowPolicyDetail] = useState(false);
  const [showAnatomyEducation, setShowAnatomyEducation] = useState(false);
  const [selectedAnatomy, setSelectedAnatomy] = useState('tka');
  const [animationStep, setAnimationStep] = useState(0);
  const [showCostCalculator, setShowCostCalculator] = useState(false);
  const [patientAge, setPatientAge] = useState(60);
  const [patientBMI, setPatientBMI] = useState('normal');
  const [hasInsurance, setHasInsurance] = useState(true);
  const [selectedCity, setSelectedCity] = useState('beijing');

  const cities = [
    { id: 'beijing', name: '北京', tier: 1 },
    { id: 'shanghai', name: '上海', tier: 1 },
    { id: 'guangzhou', name: '广州', tier: 1 },
    { id: 'shenzhen', name: '深圳', tier: 1 },
    { id: 'hangzhou', name: '杭州', tier: 2 },
    { id: 'nanjing', name: '南京', tier: 2 },
    { id: 'chengdu', name: '成都', tier: 2 },
    { id: 'wuhan', name: '武汉', tier: 2 },
  ];

  const calculateCost = (robot) => {
    const baseCost = parseInt(robot.estimatedCost.split('-')[0]);
    const maxCost = parseInt(robot.estimatedCost.split('-')[1]);
    let adjustedMin = baseCost;
    let adjustedMax = maxCost;
    
    // 城市调整
    const city = cities.find(c => c.id === selectedCity);
    if (city?.tier === 2) {
      adjustedMin *= 0.85;
      adjustedMax *= 0.85;
    }
    
    // 医保调整
    const insuranceCoverage = hasInsurance ? 0.4 : 0;
    const outOfPocketMin = adjustedMin * (1 - insuranceCoverage);
    const outOfPocketMax = adjustedMax * (1 - insuranceCoverage);
    const insuranceMin = adjustedMin * insuranceCoverage;
    const insuranceMax = adjustedMax * insuranceCoverage;
    
    // 返回平均值用于简化显示
    return {
      total: (adjustedMin + adjustedMax) / 2,
      outOfPocket: (outOfPocketMin + outOfPocketMax) / 2,
      insurance: (insuranceMin + insuranceMax) / 2
    };
  };

  const faqs = [
    { q: '骨科机器人手术安全吗？', a: '骨科机器人手术已在全球完成数百万例，安全性经过充分验证。机器人辅助可提高手术精度，降低人为误差，减少并发症风险。' },
    { q: '机器人手术费用医保能报销吗？', a: '部分国产机器人手术已纳入医保，进口机器人根据各地政策不同。2024年医保局发布收费指南后，各地正在逐步规范收费标准。' },
    { q: '机器人手术恢复时间多久？', a: '通常比传统手术恢复更快。关节置换一般2-4周可下地行走，具体因个人情况而异。' },
    { q: '哪些患者适合机器人手术？', a: '大多数需要关节置换的患者都适合，但需由医生根据具体病情评估。严重骨质疏松、特殊解剖结构或翻修手术可能需要特别考虑。' },
    { q: '国产和进口机器人有什么区别？', a: '进口机器人临床验证时间更长、文献更多；国产机器人性价比高、售后服务更便捷。疗效方面，主流产品差异不大，建议根据医院配置和医生经验选择。' },
    { q: '单髁和全膝置换如何选择？', a: '单髁置换创伤更小、恢复更快，适合单间室病变且韧带完好的患者；全膝置换适合病变范围广、畸形严重的患者。具体需要医生根据影像和查体综合评估。' },
  ];

  const patientStories = [
    { id: 1, name: '王女士', age: 68, surgery: '全膝置换', robot: 'MAKO', hospital: '北京协和医院', recovery: '术后3周下地行走', rating: 5, comment: '手术创口很小，恢复比预期快很多，现在能正常散步了。', date: '2024-11' },
    { id: 2, name: '李先生', age: 72, surgery: '单髁置换', robot: 'ROSA Knee', hospital: '上海华山医院', recovery: '术后2周出院', rating: 5, comment: '微创手术，疼痛比想象中轻，医生很专业。', date: '2024-10' },
    { id: 3, name: '张女士', age: 65, surgery: '全髋置换', robot: '元化智能', hospital: '上海六院', recovery: '术后4周恢复日常', rating: 4, comment: '国产机器人效果不错，费用也比较合理。', date: '2024-12' },
    { id: 4, name: '陈先生', age: 58, surgery: '全膝置换', robot: 'HURWA', hospital: '北医三院', recovery: '术后3周独立行走', rating: 5, comment: '主动式机械臂手术很精准，术后膝关节活动度很好。', date: '2024-11' },
  ];

  const surgicalTips = [
    { title: '术前准备', tips: ['完成术前检查（血常规、心电图、影像等）', '术前2周停用抗凝药物', '完善膝/髋关节CT或MRI检查', '练习深呼吸和咳嗽技巧', '准备助行器或拐杖'] },
    { title: '术后康复', tips: ['术后当天开始踝泵运动', '早期进行关节屈伸训练', '遵医嘱进行康复训练', '注意伤口清洁干燥', '定期复查X光片'] },
    { title: '出院后注意', tips: ['避免深蹲和跪姿', '髋关节术后避免盘腿坐', '3个月内避免剧烈运动', '按时服用抗凝/止痛药物', '如有红肿发热及时就医'] },
  ];

  // 适应症科普动画数据
  const anatomyEducation = {
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
        { title: '假体安装', desc: '植入匹配假体，恢复关节功能', icon: '🦿' },
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
        { title: '假体植入', desc: '安装股骨、胫骨、髌骨假体组件', icon: '🦿' },
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
        { title: '假体安装', desc: '植入髋臼杯和股骨柄假体', icon: '🦿' },
      ]
    }
  };

  const news = [
    { id: 1, title: '国家医保局发布手术机械臂辅助操作收费指南', date: '2024-12-25', source: '国家医保局', tag: '政策', tagColor: 'bg-red-100 text-red-700', summary: '明确手术机械臂辅助操作费分为导航、部分执行、精准执行三类，为骨科机器人手术收费提供政策依据。', isHot: true },
    { id: 2, title: 'Stryker MAKO系统完成全球第100万例手术', date: '2024-12-20', source: '医疗器械新闻', tag: '里程碑', tagColor: 'bg-blue-100 text-blue-700', summary: 'Stryker宣布其MAKO机器人辅助手术系统已在全球完成第100万例关节置换手术，标志着骨科机器人技术的重大突破。' },
    { id: 3, title: '国家药监局批准天智航新一代骨科机器人上市', date: '2024-12-18', source: '国家药监局', tag: '政策', tagColor: 'bg-red-100 text-red-700', summary: '天智航医疗科技公司获得国家药品监督管理局批准，其新一代TiRobot骨科手术机器人正式获批上市。' },
    { id: 4, title: '元化智能完成C轮融资，加速AI骨科机器人研发', date: '2024-12-15', source: '投资界', tag: '融资', tagColor: 'bg-green-100 text-green-700', summary: '元化智能宣布完成5亿元C轮融资，本轮融资将用于加速AI辅助骨科手术机器人的研发和市场推广。' },
    { id: 5, title: 'Zimmer Biomet发布ROSA膝关节系统临床数据', date: '2024-12-12', source: 'Orthopedic News', tag: '临床', tagColor: 'bg-purple-100 text-purple-700', summary: '最新临床研究显示，ROSA膝关节系统在全膝置换手术中展现出优异的精确度和患者满意度。' },
    { id: 6, title: '北京协和医院完成首例国产机器人辅助髋关节置换', date: '2024-12-10', source: '健康报', tag: '临床', tagColor: 'bg-purple-100 text-purple-700', summary: '北京协和医院骨科团队使用国产骨科机器人成功完成首例全髋关节置换手术，手术精度达到国际领先水平。' },
  ];

  // 医保政策收费项目
  const pricingPolicies = [
    { id: 32, name: '手术路径导航辅助操作费', description: '通过融合医学影像、计算机定位追踪及实时反馈等技术，术中实时显示手术路径与靶点，并提供必要的操作指导。', unit: '次', category: 'navigation' },
    { id: 33, name: '手术机械臂辅助操作费（导航）', description: '利用手术机械臂平台，操控手术器械，参与导航、定位等引导操作。', unit: '次', category: 'robot', note: '不与手术路径导航辅助操作费同时收取' },
    { id: 34, name: '手术机械臂辅助操作费（部分执行）', description: '利用手术机械臂平台，操控手术器械，参与打孔、切开等一般手术操作。', unit: '次', category: 'robot', note: '不与手术路径导航辅助操作费同时收取' },
    { id: 35, name: '手术机械臂辅助操作费（精准执行）', description: '利用手术机械臂平台，操控手术器械，完成器官、软组织或硬组织的切除、重建、修复、平衡等操作，参与关键或者全部手术过程。', unit: '次', category: 'robot', note: '骨科机器人关节置换手术主要适用此项' },
    { id: 1, name: '医学3D重建辅助操作费', description: '通过数字技术、人工智能技术等将患者影像检查结果构建虚拟3D模型，满足术前规划、导板设计、手术预演等需要。', unit: '件', category: '3d' },
  ];

  const displayedNews = showAllNews ? news : news.filter(item => item.isHot);

  const indications = [
    { id: 'all', name: '全部', icon: '🔍' },
    { id: 'uka', name: '单髁置换', icon: '🦵' },
    { id: 'tka', name: '全膝置换', icon: '🦴' },
    { id: 'tha', name: '全髋置换', icon: '🏥' }
  ];

  const robots = [
    { id: 1, name: 'MAKO', manufacturer: 'Stryker', origin: '进口', nmpa: '国械注进20203010640', indications: ['uka', 'tka', 'tha'], technology: '光学导航+触觉反馈', accuracy: '±0.5mm', installations: '1500+', evidence: 'Level I-II', advantages: ['触觉边界保护', 'CT预规划精准'], limitations: ['需要术前CT', '设备成本高'], color: 'bg-blue-500', image: null, patientBenefits: ['创口更小', '恢复缩短30%', '假体存活率95%'], recoveryTime: '2-3周', painLevel: '轻度', estimatedCost: '8-12万', hospitalCount: 120, patientRating: 4.8, hospitals: ['北京协和医院', '上海华山医院', '华西医院'], successRate: '98%', avgOperationTime: '90-120分钟', learningCurve: '20-30例', publications: 156, clinicalTrials: 12, fdaClearance: '2015年', ceCertification: '已认证', armDOF: 6, armBrand: 'Stryker自研', cameraBrand: 'NDI Polaris', navigationSystem: 'CT-based', hapticFeedback: true, realTimeTracking: true, implantCompatibility: ['Stryker Triathlon', 'Mako TKA'], softwareVersion: 'v4.0', serviceNetwork: '全国32城市', trainingProgram: '3天理论+5天实操', annualMaintenance: '8-12万/年' },
    { id: 2, name: 'ROSA Knee', manufacturer: 'Zimmer Biomet', origin: '进口', nmpa: '国械注进20213010825', indications: ['uka', 'tka'], technology: '无需CT影像导航', accuracy: '±1mm', installations: '800+', evidence: 'Level II', advantages: ['无需术前CT', '工作流程快'], limitations: ['无触觉反馈'], color: 'bg-purple-500', image: null, patientBenefits: ['无需CT检查', '手术时间短'], recoveryTime: '2-4周', painLevel: '轻中度', estimatedCost: '6-10万', hospitalCount: 85, patientRating: 4.6, hospitals: ['北大人民医院', '浙一医院', '南方医院'], successRate: '96%', avgOperationTime: '70-100分钟', learningCurve: '15-25例', publications: 89, clinicalTrials: 8, fdaClearance: '2019年', ceCertification: '已认证', armDOF: 6, armBrand: 'Zimmer自研', cameraBrand: 'NDI Polaris', navigationSystem: 'Image-free', hapticFeedback: false, realTimeTracking: true, implantCompatibility: ['Zimmer Persona', 'NexGen'], softwareVersion: 'v3.1', serviceNetwork: '全国28城市', trainingProgram: '2天理论+3天实操', annualMaintenance: '6-10万/年' },
    { id: 3, name: 'Yuanhua', manufacturer: '元化智能', origin: '国产', nmpa: '国械注准20223010368', indications: ['uka', 'tka', 'tha'], technology: '自研机械臂+视觉导航+AI', accuracy: '±0.5mm', installations: '200+', evidence: 'Level II-III', advantages: ['自研七轴机械臂', '国产创新', 'AI辅助规划'], limitations: ['装机量较少'], color: 'bg-teal-500', image: null, patientBenefits: ['AI智能规划', '价格适中'], recoveryTime: '2-3周', painLevel: '轻度', estimatedCost: '5-8万', hospitalCount: 45, patientRating: 4.6, hospitals: ['上海六院', '广东省人民医院'], successRate: '95%', avgOperationTime: '80-110分钟', learningCurve: '15-20例', publications: 23, clinicalTrials: 3, fdaClearance: '申请中', ceCertification: '申请中', armDOF: 7, armBrand: '元化自研', cameraBrand: '元化自研双目视觉', navigationSystem: 'AI-Vision', hapticFeedback: true, realTimeTracking: true, implantCompatibility: ['通用兼容多品牌'], softwareVersion: 'v2.5', serviceNetwork: '全国18城市', trainingProgram: '2天理论+4天实操', annualMaintenance: '4-6万/年' },
    { id: 4, name: 'HURWA', manufacturer: '和华瑞博', origin: '国产', nmpa: '国械注准20213010956', indications: ['uka', 'tka', 'tha'], technology: '主动式机械臂', accuracy: '±0.5mm', installations: '150+', evidence: 'Level II-III', advantages: ['主动截骨', '全自动执行'], limitations: ['装机量提升中'], color: 'bg-red-500', image: null, patientBenefits: ['全自动精准', '手术一致性高'], recoveryTime: '2-3周', painLevel: '轻度', estimatedCost: '5-8万', hospitalCount: 60, patientRating: 4.5, hospitals: ['北医三院', '上海九院', '华西医院'], successRate: '95%', avgOperationTime: '80-100分钟', learningCurve: '15-20例', publications: 18, clinicalTrials: 3, fdaClearance: '申请中', ceCertification: '申请中', armDOF: 6, armBrand: 'KUKA定制', cameraBrand: 'NDI Polaris', navigationSystem: 'Optical+CT', hapticFeedback: false, realTimeTracking: true, implantCompatibility: ['通用兼容多品牌'], softwareVersion: 'v2.0', serviceNetwork: '全国20城市', trainingProgram: '2天理论+4天实操', annualMaintenance: '4-6万/年' },
    { id: 5, name: 'Natonav', manufacturer: '纳通医疗', origin: '国产', nmpa: '国械注准20243010512', indications: ['uka', 'tka'], technology: '光学导航', accuracy: '±0.7mm', installations: '120+', evidence: 'Level II-III', advantages: ['国产品牌', '性价比高'], limitations: ['市场推广阶段'], color: 'bg-emerald-500', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop', patientBenefits: ['价格实惠', '医保友好'], recoveryTime: '2-4周', painLevel: '轻中度', estimatedCost: '4-7万', hospitalCount: 38, patientRating: 4.4, hospitals: ['上海一院', '南医大一附院'], successRate: '93%', avgOperationTime: '85-110分钟', learningCurve: '15-20例', publications: 12, clinicalTrials: 2, fdaClearance: '无', ceCertification: '申请中', armDOF: 6, armBrand: '纳通自研', cameraBrand: 'NDI Polaris', navigationSystem: 'Optical', hapticFeedback: false, realTimeTracking: true, implantCompatibility: ['通用兼容多品牌'], softwareVersion: 'v1.8', serviceNetwork: '全国15城市', trainingProgram: '2天理论+3天实操', annualMaintenance: '3-5万/年' },
    { id: 6, name: 'Phecda', manufacturer: '威高骨科', origin: '国产', nmpa: '国械注准20233010286', indications: ['tka'], technology: '智能导航定位', accuracy: '±0.8mm', installations: '160+', evidence: 'Level II-III', advantages: ['国产知名品牌', '售后服务网络广'], limitations: ['适应症待拓展'], color: 'bg-orange-500', image: null, patientBenefits: ['全国服务网络', '配件供应稳定'], recoveryTime: '3-4周', painLevel: '中度', estimatedCost: '5-8万', hospitalCount: 65, patientRating: 4.5, hospitals: ['齐鲁医院', '威海中心医院', '山东省立医院'], successRate: '94%', avgOperationTime: '95-120分钟', learningCurve: '15-22例', publications: 18, clinicalTrials: 2, fdaClearance: '无', ceCertification: '申请中', armDOF: 6, armBrand: 'KUKA定制', cameraBrand: 'NDI Polaris', navigationSystem: 'Optical', hapticFeedback: false, realTimeTracking: true, implantCompatibility: ['威高假体', '通用兼容'], softwareVersion: 'v2.0', serviceNetwork: '全国35城市', trainingProgram: '2天理论+4天实操', annualMaintenance: '3-5万/年' },
    { id: 7, name: '键嘉', manufacturer: '键嘉医疗', origin: '国产', nmpa: '注册中', indications: ['uka', 'tka'], technology: '光学导航+术中动态配准', accuracy: '±0.8mm', installations: '80+', evidence: 'Level II-III', advantages: ['部署快', '术中流程简化', '国产性价比'], limitations: ['临床数据累积中'], color: 'bg-cyan-500', image: null, patientBenefits: ['术中时间更短', '费用更可控'], recoveryTime: '2-3周', painLevel: '轻中度', estimatedCost: '4-7万', hospitalCount: 30, patientRating: 4.4, hospitals: ['江苏省人民医院', '浙江大学医学院附属医院'], successRate: '93%', avgOperationTime: '80-110分钟', learningCurve: '12-18例', publications: 8, clinicalTrials: 1, fdaClearance: '无', ceCertification: '申请中', armDOF: 6, armBrand: '国产定制', cameraBrand: 'NDI Polaris', navigationSystem: 'Optical', hapticFeedback: false, realTimeTracking: true, implantCompatibility: ['通用兼容'], softwareVersion: 'v1.5', serviceNetwork: '全国12城市', trainingProgram: '2天理论+3天实操', annualMaintenance: '3-5万/年' },
    { id: 8, name: '爱康', manufacturer: '爱康医疗', origin: '国产', nmpa: '注册中', indications: ['tka', 'tha'], technology: 'AI术前规划+机械臂辅助手术', accuracy: '±0.6mm', installations: '120+', evidence: 'Level II-III', advantages: ['AI规划', '骨切削精度高', '售后响应快'], limitations: ['适配假体品牌有限'], color: 'bg-rose-500', image: null, patientBenefits: ['创伤更小', '恢复更快'], recoveryTime: '2-3周', painLevel: '轻度', estimatedCost: '5-8万', hospitalCount: 45, patientRating: 4.5, hospitals: ['北京积水潭医院', '南京鼓楼医院'], successRate: '94%', avgOperationTime: '85-115分钟', learningCurve: '15-20例', publications: 12, clinicalTrials: 2, fdaClearance: '无', ceCertification: '申请中', armDOF: 7, armBrand: '国产定制', cameraBrand: '国产视觉系统', navigationSystem: 'AI-Vision', hapticFeedback: true, realTimeTracking: true, implantCompatibility: ['爱康假体', '通用兼容'], softwareVersion: 'v2.1', serviceNetwork: '全国18城市', trainingProgram: '2天理论+4天实操', annualMaintenance: '4-6万/年' },
    { id: 9, name: '佗道', manufacturer: '佗道医疗', origin: '国产', nmpa: '注册中', indications: ['tka', 'tha'], technology: '术前规划+光学导航', accuracy: '±0.7mm', installations: '60+', evidence: 'Level II-III', advantages: ['流程简化', '性价比高'], limitations: ['临床数据累积中'], color: 'bg-slate-500', image: null, patientBenefits: ['费用更可控', '恢复更平稳'], recoveryTime: '2-3周', painLevel: '轻中度', estimatedCost: '4-7万', hospitalCount: 25, patientRating: 4.3, hospitals: ['武汉协和医院', '中南大学湘雅医院'], successRate: '92%', avgOperationTime: '85-110分钟', learningCurve: '12-18例', publications: 6, clinicalTrials: 1, fdaClearance: '无', ceCertification: '申请中', armDOF: 6, armBrand: '国产定制', cameraBrand: '国产视觉系统', navigationSystem: 'Optical', hapticFeedback: false, realTimeTracking: true, implantCompatibility: ['通用兼容'], softwareVersion: 'v1.3', serviceNetwork: '全国10城市', trainingProgram: '2天理论+3天实操', annualMaintenance: '3-5万/年' }
  ];

  const surgeryVideos = [
    { id: 1, title: '全膝置换机器人辅助手术（示教版）', duration: '12:40', level: '医生', indication: 'tka', source: '示教中心', url: '#' },
    { id: 2, title: '单髁置换流程演示（患者科普）', duration: '06:15', level: '患者', indication: 'uka', source: '健康科普', url: '#' },
    { id: 3, title: '全髋置换机器人规划与执行', duration: '09:30', level: '医生', indication: 'tha', source: '学术会议', url: '#' },
  ];

  const researchPapers = [
    { id: 1, title: '机器人辅助全膝置换的临床随机对照研究', journal: 'J Arthroplasty', year: '2023', level: 'Level I', indication: 'tka', doi: '10.0000/xxx', url: '#' },
    { id: 2, title: '单髁置换机器人导航精度对比研究', journal: 'Bone Joint J', year: '2022', level: 'Level II', indication: 'uka', doi: '10.0000/yyy', url: '#' },
    { id: 3, title: '全髋置换机器人术后恢复随访', journal: 'Orthopedics', year: '2024', level: 'Level II', indication: 'tha', doi: '10.0000/zzz', url: '#' },
  ];

  const cameraOptions = ['all', ...new Set(robots.map(robot => robot.cameraBrand))];
  const armOptions = ['all', ...new Set(robots.map(robot => robot.armBrand))];

  const filteredRobots = robots.filter(robot => {
    if (selectedIndication !== 'all' && !robot.indications.includes(selectedIndication)) return false;
    if (budgetFilter !== 'all') {
      const cost = parseInt(robot.estimatedCost.split('-')[0]);
      if (budgetFilter === 'low' && cost > 6) return false;
      if (budgetFilter === 'medium' && (cost < 6 || cost > 10)) return false;
      if (budgetFilter === 'high' && cost < 8) return false;
    }
    if (recoveryFilter !== 'all') {
      const weeks = parseInt(robot.recoveryTime.split('-')[0]);
      if (recoveryFilter === 'fast' && weeks > 2) return false;
      if (recoveryFilter === 'normal' && weeks > 3) return false;
    }
    if (cameraFilter !== 'all' && robot.cameraBrand !== cameraFilter) return false;
    if (armFilter !== 'all' && robot.armBrand !== armFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price') return parseInt(a.estimatedCost.split('-')[0]) - parseInt(b.estimatedCost.split('-')[0]);
    if (sortBy === 'recovery') return parseInt(a.recoveryTime.split('-')[0]) - parseInt(b.recoveryTime.split('-')[0]);
    if (sortBy === 'rating') return b.patientRating - a.patientRating;
    return 0;
  });

  const getRobotTags = (robot) => {
    const tags = [];
    const cost = parseInt(robot.estimatedCost.split('-')[0]);
    const weeks = parseInt(robot.recoveryTime.split('-')[0]);
    if (cost <= 6) tags.push({ label: '性价比', color: 'bg-green-100 text-green-700' });
    if (weeks <= 2) tags.push({ label: '快速恢复', color: 'bg-blue-100 text-blue-700' });
    if (robot.patientRating >= 4.7) tags.push({ label: '好评', color: 'bg-purple-100 text-purple-700' });
    if (parseInt(robot.installations) > 500) tags.push({ label: '成熟稳定', color: 'bg-orange-100 text-orange-700' });
    return tags;
  };

  const getIndicationLabels = (indicationIds) => {
    const labels = { uka: '单髁', tka: '全膝', tha: '全髋' };
    return indicationIds.map(id => labels[id]).join(' · ');
  };

  const toggleCompare = (robot, e) => {
    e.stopPropagation();
    if (selectedForCompare.find(r => r.id === robot.id)) {
      setSelectedForCompare(selectedForCompare.filter(r => r.id !== robot.id));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, robot]);
    }
  };

  const toggleFavorite = (robot, e) => {
    e.stopPropagation();
    if (favorites.find(r => r.id === robot.id)) {
      setFavorites(favorites.filter(r => r.id !== robot.id));
    } else {
      setFavorites([...favorites, robot]);
    }
  };

  const isFavorite = (robot) => favorites.find(r => r.id === robot.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">骨科机器人智选</h1>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
            <div className="flex items-center">
              <Newspaper className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="font-bold text-gray-900">行业动态</h2>
            </div>
            <button 
              onClick={() => setShowAllNews(!showAllNews)}
              className="text-blue-600 text-sm font-medium flex items-center hover:underline"
            >
              {showAllNews ? '收起' : '查看全部'}
              <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showAllNews ? 'rotate-90' : ''}`} />
            </button>
          </div>
          <div className="divide-y">
            {displayedNews.map((item) => (
              <div 
                key={item.id} 
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => item.isHot && setShowPolicyDetail(true)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {item.isHot && <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold animate-pulse">HOT</span>}
                      <span className={`${item.tagColor} px-2 py-0.5 rounded text-xs font-medium`}>{item.tag}</span>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.summary}</p>
                    <p className="text-xs text-gray-400 mt-1">来源：{item.source}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        {/* Indication Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4">
          {indications.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setSelectedIndication(ind.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedIndication === ind.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{ind.icon}</span>
              {ind.name}
            </button>
          ))}
          <button
            onClick={() => { setShowAnatomyEducation(true); setAnimationStep(0); }}
            className="flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
          >
            <Play className="w-4 h-4 mr-2" />
            手术科普动画
          </button>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <select 
            value={budgetFilter} 
            onChange={(e) => setBudgetFilter(e.target.value)} 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">预算不限</option>
            <option value="low">≤6万</option>
            <option value="medium">6-10万</option>
            <option value="high">≥8万</option>
          </select>
          <select 
            value={recoveryFilter} 
            onChange={(e) => setRecoveryFilter(e.target.value)} 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">恢复时间不限</option>
            <option value="fast">≤2周</option>
            <option value="normal">≤3周</option>
          </select>
          <select
            value={cameraFilter}
            onChange={(e) => setCameraFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
          >
            {cameraOptions.map((camera) => (
              <option key={camera} value={camera}>
                {camera === 'all' ? '相机不限' : camera}
              </option>
            ))}
          </select>
          <select
            value={armFilter}
            onChange={(e) => setArmFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
          >
            {armOptions.map((arm) => (
              <option key={arm} value={arm}>
                {arm === 'all' ? '机械臂不限' : arm}
              </option>
            ))}
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)} 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="recommended">智能推荐</option>
            <option value="price">费用优先</option>
            <option value="recovery">快速恢复</option>
            <option value="rating">评分最高</option>
          </select>
          <button 
            onClick={() => { setCompareMode(!compareMode); if (compareMode) setSelectedForCompare([]); }} 
            className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${compareMode ? 'bg-blue-600 text-white' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            <Filter className="w-4 h-4 mr-1" />
            {compareMode ? `对比中 (${selectedForCompare.length}/3)` : '对比'}
          </button>
          <span className="text-sm text-gray-500 ml-auto">
            共 <span className="font-semibold text-blue-600">{filteredRobots.length}</span> 款产品
          </span>
        </div>
      </div>

      {/* Compare Panel */}
      {compareMode && selectedForCompare.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">产品对比</h3>
              <button onClick={() => setSelectedForCompare([])} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">对比项</th>
                    {selectedForCompare.map(r => (
                      <th key={r.id} className="text-left py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <div className={`w-8 h-8 ${r.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
                            {r.name.substring(0, 2)}
                          </div>
                          <span className="font-bold">{r.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3 text-gray-500">厂商</td>
                    {selectedForCompare.map(r => <td key={r.id} className="py-2 px-3">{r.manufacturer}</td>)}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 text-gray-500">适应症</td>
                    {selectedForCompare.map(r => <td key={r.id} className="py-2 px-3">{getIndicationLabels(r.indications)}</td>)}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 text-gray-500">精度</td>
                    {selectedForCompare.map(r => <td key={r.id} className="py-2 px-3 font-medium">{r.accuracy}</td>)}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 text-gray-500">恢复时间</td>
                    {selectedForCompare.map(r => <td key={r.id} className="py-2 px-3">{r.recoveryTime}</td>)}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 text-gray-500">最新中标价格</td>
                    {selectedForCompare.map(r => <td key={r.id} className="py-2 px-3 font-medium">{r.estimatedCost}</td>)}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 text-gray-500">成功率</td>
                    {selectedForCompare.map(r => <td key={r.id} className="py-2 px-3 text-green-600 font-semibold">{r.successRate}</td>)}
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-500">装机量</td>
                    {selectedForCompare.map(r => <td key={r.id} className="py-2 px-3">{r.installations}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Robot Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRobots.map(robot => {
            const tags = getRobotTags(robot);
            const costNum = parseInt(robot.estimatedCost.split('-')[0]);
            const isSelected = selectedForCompare.find(r => r.id === robot.id);
            
            return (
              <div 
                key={robot.id} 
                onClick={() => setSelectedRobot(robot)}
                className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border-2 ${
                  isSelected ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${robot.color} rounded-xl flex items-center justify-center text-white text-lg font-bold relative`}>
                        {robot.name.substring(0, 2)}
                        <span className={`absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full font-medium ${
                          robot.origin === '进口' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {robot.origin}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{robot.name}</h3>
                        <p className="text-xs text-gray-500">{robot.manufacturer}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {robot.image && (
                        <img src={robot.image} alt={robot.name} className="w-16 h-16 object-contain" />
                      )}
                      {compareMode && (
                        <button 
                          onClick={(e) => toggleCompare(robot, e)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-2">
                    适应症：{getIndicationLabels(robot.indications)}
                  </div>

                  {/* Hardware Info */}
                  <div className="flex flex-wrap gap-1 mb-2 text-xs">
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">🦾 {robot.armBrand}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">📷 {robot.cameraBrand}</span>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tags.map((tag, idx) => (
                        <span key={idx} className={`${tag.color} px-2 py-0.5 rounded-full text-xs`}>{tag.label}</span>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500">恢复</p>
                      <p className="font-semibold text-sm">{robot.recoveryTime}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500">费用</p>
                      <p className={`font-semibold text-sm ${costNum <= 6 ? 'text-green-600' : costNum <= 9 ? 'text-orange-600' : 'text-red-600'}`}>
                        {robot.estimatedCost}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500">成功率</p>
                      <p className="font-semibold text-sm text-green-600">{robot.successRate}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-sm">{i < Math.floor(robot.patientRating) ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <span className="ml-1 text-gray-500">{robot.patientRating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-xs">{robot.hospitalCount}家医院</span>
                      <button 
                        onClick={(e) => toggleFavorite(robot, e)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Heart className={`w-4 h-4 ${isFavorite(robot) ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRobots.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-3">没有找到符合条件的产品</p>
            <button 
              onClick={() => { setBudgetFilter('all'); setRecoveryFilter('all'); setCameraFilter('all'); setArmFilter('all'); setSelectedIndication('all'); }} 
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <button 
            onClick={() => setShowFAQ(!showFAQ)}
            className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-green-50 to-teal-50"
          >
            <div className="flex items-center">
              <HelpCircle className="w-5 h-5 text-green-600 mr-2" />
              <h2 className="font-bold text-gray-900">常见问题</h2>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showFAQ ? 'rotate-90' : ''}`} />
          </button>
          {showFAQ && (
            <div className="divide-y">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-start">
                    <span className="text-green-600 mr-2">Q:</span>
                    {faq.q}
                  </h3>
                  <p className="text-sm text-gray-600 pl-5">{faq.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Patient Stories Section */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-b">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-orange-600 mr-2" />
              <h2 className="font-bold text-gray-900">患者分享</h2>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {patientStories.map((story) => (
              <div key={story.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-medium">{story.name}</span>
                    <span className="text-gray-500 text-sm ml-2">{story.age}岁</span>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded ml-2">{story.surgery}</span>
                  </div>
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(story.rating)].map((_, i) => <span key={i}>★</span>)}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">"{story.comment}"</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Hospital className="w-3 h-3 mr-1" />
                  <span>{story.hospital}</span>
                  <span className="mx-2">·</span>
                  <span>使用 {story.robot}</span>
                  <span className="mx-2">·</span>
                  <span>{story.recovery}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Surgical Tips Section */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
            <div className="flex items-center">
              <ClipboardList className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="font-bold text-gray-900">手术指南</h2>
            </div>
          </div>
          <div className="p-4 grid md:grid-cols-3 gap-4">
            {surgicalTips.map((section, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mr-2 ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-green-500' : 'bg-orange-500'}`}>
                    {idx + 1}
                  </span>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calculator className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="font-bold text-gray-900">费用估算器</h2>
              </div>
              <span className="text-xs text-gray-500">仅供参考，实际以医院为准</span>
            </div>
          </div>
          <div className="p-4">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">选择城市</label>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">医保情况</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" checked={hasInsurance} onChange={() => setHasInsurance(true)} className="mr-2" />
                    <span className="text-sm">有医保</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" checked={!hasInsurance} onChange={() => setHasInsurance(false)} className="mr-2" />
                    <span className="text-sm">自费</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 font-medium">产品</th>
                    <th className="text-center p-3 font-medium">总费用</th>
                    <th className="text-center p-3 font-medium">医保报销</th>
                    <th className="text-center p-3 font-medium">自付费用</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {robots.slice(0, 4).map(robot => {
                    const cost = calculateCost(robot);
                    return (
                      <tr key={robot.id} className="hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 ${robot.color} rounded-lg flex items-center justify-center text-white text-xs font-bold mr-2`}>
                              {robot.name.substring(0, 2)}
                            </div>
                            <div>
                              <p className="font-medium">{robot.name}</p>
                              <p className="text-xs text-gray-500">{robot.manufacturer}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-center">{cost.total.min}-{cost.total.max}万</td>
                        <td className="p-3 text-center text-green-600">
                          {hasInsurance ? `${cost.insurance.min}-${cost.insurance.max}万` : '-'}
                        </td>
                        <td className="p-3 text-center font-medium text-orange-600">{cost.outOfPocket.min}-{cost.outOfPocket.max}万</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* 费用估算基于公开数据，不同医院、不同病情可能有较大差异，请以实际就诊为准</p>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRobot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRobot(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-start">
              <div className="flex items-center space-x-4">
                {selectedRobot.image ? (
                  <img src={selectedRobot.image} alt={selectedRobot.name} className="w-14 h-14 rounded-xl object-cover bg-gray-100" />
                ) : (
                  <div className={`w-14 h-14 ${selectedRobot.color} rounded-xl flex items-center justify-center text-white text-xl font-bold`}>
                    {selectedRobot.name.substring(0, 2)}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">{selectedRobot.name}</h2>
                  <p className="text-gray-500">{selectedRobot.manufacturer}</p>
                  <p className="text-xs text-gray-400 mt-1">适应症：{getIndicationLabels(selectedRobot.indications)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={(e) => toggleFavorite(selectedRobot, e)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Heart className={`w-5 h-5 ${isFavorite(selectedRobot) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
                <button onClick={() => setSelectedRobot(null)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Product Image */}
            {selectedRobot.image && (
              <div className="px-5 pt-5">
                <img src={selectedRobot.image} alt={selectedRobot.name} className="w-full h-48 object-contain bg-gray-50 rounded-xl" />
              </div>
            )}

            <div className="p-5 space-y-5">
              <>
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-blue-50 p-3 rounded-xl text-center">
                      <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">恢复时间</p>
                      <p className="font-bold text-sm">{selectedRobot.recoveryTime}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-xl text-center">
                      <DollarSign className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">最新中标价格</p>
                      <p className="font-bold text-sm">{selectedRobot.estimatedCost}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl text-center">
                      <Award className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">成功率</p>
                      <p className="font-bold text-sm text-green-600">{selectedRobot.successRate}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl text-center">
                      <Hospital className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">配置医院</p>
                      <p className="font-bold text-sm">{selectedRobot.hospitalCount}家</p>
                    </div>
                  </div>

                  {/* Technical Specs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-gray-50 p-3 rounded-xl text-center">
                      <Cpu className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">定位精度</p>
                      <p className="font-bold text-sm">{selectedRobot.accuracy}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl text-center">
                      <Settings className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">机械臂</p>
                      <p className="font-bold text-sm">{selectedRobot.armDOF}轴</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl text-center">
                      <BookOpen className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">学习曲线</p>
                      <p className="font-bold text-sm">{selectedRobot.learningCurve}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl text-center">
                      <FileText className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">文献发表</p>
                      <p className="font-bold text-sm">{selectedRobot.publications}篇</p>
                    </div>
                  </div>

                  {/* Hardware Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">🦾 机械臂品牌</p>
                      <p className="font-semibold text-blue-700">{selectedRobot.armBrand}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">📷 定位相机</p>
                      <p className="font-semibold text-purple-700">{selectedRobot.cameraBrand}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">导航系统</p>
                      <p className="font-semibold">{selectedRobot.navigationSystem}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">手术时间</p>
                      <p className="font-semibold">{selectedRobot.avgOperationTime}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">触觉反馈</p>
                      <p className="font-semibold">{selectedRobot.hapticFeedback ? '✓ 支持' : '✗ 不支持'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">实时追踪</p>
                      <p className="font-semibold">{selectedRobot.realTimeTracking ? '✓ 支持' : '✗ 不支持'}</p>
                    </div>
                  </div>

                  {/* Advantages */}
                  <div>
                    <h3 className="font-bold mb-2 text-sm">核心优势</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {[...selectedRobot.patientBenefits, ...selectedRobot.advantages].map((item, i) => (
                        <div key={i} className="flex items-center bg-green-50 p-2 rounded-lg text-sm">
                          <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Implant Compatibility */}
                  <div>
                    <h3 className="font-bold mb-2 text-sm">假体兼容性</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRobot.implantCompatibility.map((item, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">{item}</span>
                      ))}
                    </div>
                  </div>

                  {/* Hospitals */}
                  <div>
                    <h3 className="font-bold mb-2 text-sm">配置医院</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRobot.hospitals.map((h, i) => (
                        <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{h}</span>
                      ))}
                    </div>
                  </div>

                  {/* Surgery Videos */}
                  <div>
                    <h3 className="font-bold mb-2 text-sm">手术视频</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {surgeryVideos
                        .filter(video => selectedRobot.indications.includes(video.indication))
                        .map(video => (
                          <div key={video.id} className="bg-gray-50 p-3 rounded-xl flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{video.title}</p>
                              <p className="text-xs text-gray-500">{video.level} · {video.duration} · {video.source}</p>
                            </div>
                            <a href={video.url} className="text-blue-600 text-sm font-medium flex items-center">
                              <Play className="w-4 h-4 mr-1" />
                              播放
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Research Papers */}
                  <div>
                    <h3 className="font-bold mb-2 text-sm">论文与证据</h3>
                    <div className="space-y-2">
                      {researchPapers
                        .filter(paper => selectedRobot.indications.includes(paper.indication))
                        .map(paper => (
                          <div key={paper.id} className="bg-gray-50 p-3 rounded-xl flex items-start justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{paper.title}</p>
                              <p className="text-xs text-gray-500">{paper.journal} · {paper.year} · {paper.level} · DOI {paper.doi}</p>
                            </div>
                            <a href={paper.url} className="text-blue-600 text-sm font-medium flex items-center">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              查看
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">FDA认证</p>
                      <p className={`font-semibold text-sm ${selectedRobot.fdaClearance !== '无' && selectedRobot.fdaClearance !== '申请中' ? 'text-green-600' : 'text-gray-400'}`}>
                        {selectedRobot.fdaClearance}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">CE认证</p>
                      <p className={`font-semibold text-sm ${selectedRobot.ceCertification === '已认证' ? 'text-green-600' : 'text-gray-400'}`}>
                        {selectedRobot.ceCertification}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">NMPA</p>
                      <p className="font-semibold text-sm text-green-600">已认证</p>
                    </div>
                  </div>

                  {selectedRobot.limitations.length > 0 && (
                    <div>
                      <h3 className="font-bold mb-2 text-sm text-gray-600">注意事项</h3>
                      <div className="space-y-1">
                        {selectedRobot.limitations.map((l, i) => (
                          <div key={i} className="flex items-center bg-yellow-50 p-2 rounded-lg text-sm">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Cost Estimate */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                    <h3 className="font-bold mb-2 text-sm flex items-center">
                      <Calculator className="w-4 h-4 mr-2 text-purple-600" />
                      费用快速估算
                    </h3>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-xs text-gray-500">总费用</p>
                        <p className="font-bold text-lg text-gray-900">{calculateCost(selectedRobot).total.toFixed(1)}万</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">医保报销~40%</p>
                        <p className="font-bold text-lg text-green-600">-{calculateCost(selectedRobot).insurance.toFixed(1)}万</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">自付约</p>
                        <p className="font-bold text-lg text-orange-600">{calculateCost(selectedRobot).outOfPocket.toFixed(1)}万</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Support */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-xs text-gray-500">培训周期</p>
                      <p className="font-semibold text-sm">{selectedRobot.trainingProgram}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <MapPin className="w-6 h-6 text-green-600 mb-2" />
                      <p className="text-xs text-gray-500">服务网络</p>
                      <p className="font-semibold text-sm">{selectedRobot.serviceNetwork}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl">
                      <Wrench className="w-6 h-6 text-orange-600 mb-2" />
                      <p className="text-xs text-gray-500">年维护费用</p>
                      <p className="font-semibold text-sm">{selectedRobot.annualMaintenance}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <Hospital className="w-6 h-6 text-purple-600 mb-2" />
                      <p className="text-xs text-gray-500">全球装机量</p>
                      <p className="font-semibold text-sm">{selectedRobot.installations}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-bold mb-3 text-sm flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-blue-600" />
                      售后服务内容
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span>7×24小时技术支持热线</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span>定期软件升级与维护</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span>现场工程师手术支持</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span>医生进阶培训课程</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span>备件快速响应服务</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2 text-sm">配置医院</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRobot.hospitals.map((h, i) => (
                        <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{h}</span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setShowConsult(true)}
                      className="bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      预约咨询
                    </button>
                    <button 
                      onClick={() => setShowTrainingContact(true)}
                      className="bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      联系培训
                    </button>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    联系厂商获取报价
                  </button>
              </>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Toolbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {favorites.length > 0 && (
                <button className="px-4 py-2 rounded-lg text-sm font-medium flex items-center bg-red-50 text-red-600">
                  <Heart className="w-4 h-4 mr-2 fill-red-500" />
                  收藏 ({favorites.length})
                </button>
              )}
              <span className="text-sm text-gray-400">数据更新于 2024.12</span>
            </div>
            <button 
              onClick={() => setShowConsult(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium flex items-center bg-green-600 text-white hover:bg-green-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              在线咨询
            </button>
          </div>
        </div>
      </div>

      {/* Consult Modal */}
      {showConsult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowConsult(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">在线咨询</h3>
              <button onClick={() => setShowConsult(false)}><X className="w-5 h-5" /></button>
            </div>
            <p className="text-gray-600 mb-4">我们的骨科专家团队将为您提供专业咨询服务</p>
            <div className="space-y-3">
              <button className="w-full p-4 bg-green-50 rounded-xl flex items-center justify-between hover:bg-green-100">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-green-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">电话咨询</p>
                    <p className="text-sm text-gray-500">400-XXX-XXXX</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full p-4 bg-blue-50 rounded-xl flex items-center justify-between hover:bg-blue-100">
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-blue-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">在线客服</p>
                    <p className="text-sm text-gray-500">9:00-21:00 在线</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full p-4 bg-purple-50 rounded-xl flex items-center justify-between hover:bg-purple-100">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-purple-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">查找附近医院</p>
                    <p className="text-sm text-gray-500">定位您附近的机器人手术医院</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Training Contact Modal */}
      {showTrainingContact && selectedRobot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowTrainingContact(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">联系 {selectedRobot.manufacturer} 培训</h3>
              <button onClick={() => setShowTrainingContact(false)}><X className="w-5 h-5" /></button>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl mb-4">
              <div className="flex items-center mb-2">
                <div className={`w-10 h-10 ${selectedRobot.color} rounded-lg flex items-center justify-center text-white font-bold mr-3`}>
                  {selectedRobot.name.substring(0, 2)}
                </div>
                <div>
                  <p className="font-bold">{selectedRobot.name}</p>
                  <p className="text-sm text-gray-500">{selectedRobot.manufacturer}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                <p>培训周期：{selectedRobot.trainingProgram}</p>
                <p>学习曲线：{selectedRobot.learningCurve}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-medium mb-2 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                  培训内容
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 系统操作与软件使用</li>
                  <li>• 术前规划与导航原理</li>
                  <li>• 模拟手术实操训练</li>
                  <li>• 真实病例观摩学习</li>
                  <li>• 常见问题处理技巧</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full p-4 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700">
                <Phone className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <p className="font-medium">预约培训咨询</p>
                </div>
              </button>
              <button className="w-full p-4 bg-green-50 rounded-xl flex items-center justify-between hover:bg-green-100">
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">在线咨询培训详情</p>
                    <p className="text-sm text-gray-500">工作日 9:00-18:00</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full p-4 bg-purple-50 rounded-xl flex items-center justify-between hover:bg-purple-100">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-purple-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">下载培训资料</p>
                    <p className="text-sm text-gray-500">产品手册、操作指南</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Policy Detail Modal */}
      {showPolicyDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowPolicyDetail(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">政策解读</span>
                  <span className="text-xs text-gray-400">2024-12-25</span>
                </div>
                <h2 className="text-lg font-bold">手术机械臂辅助操作收费指南</h2>
                <p className="text-sm text-gray-500">国家医保局发布征求意见稿</p>
              </div>
              <button onClick={() => setShowPolicyDetail(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-5">
              {/* Key Points */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl">
                <h3 className="font-bold text-red-800 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  政策要点
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">1</span>
                    <span>手术机械臂辅助操作费分为<strong>导航、部分执行、精准执行</strong>三个层级</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">2</span>
                    <span>骨科机器人关节置换属于<strong>"精准执行"</strong>类别，收费标准最高</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">3</span>
                    <span>同一设备具备多项功能的，<strong>按最高标准收费，不叠加计费</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">4</span>
                    <span>需<strong>保存并上传医疗数据和设备运行记录</strong>，否则需减收</span>
                  </li>
                </ul>
              </div>

              {/* Pricing Items */}
              <div>
                <h3 className="font-bold mb-3 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  骨科机器人相关收费项目
                </h3>
                <div className="space-y-3">
                  {pricingPolicies.map((policy) => (
                    <div key={policy.id} className={`p-4 rounded-xl border ${policy.id === 35 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">第{policy.id}项</span>
                            {policy.id === 35 && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">骨科适用</span>}
                          </div>
                          <h4 className="font-medium text-gray-900">{policy.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{policy.description}</p>
                          {policy.note && (
                            <p className="text-xs text-orange-600 mt-2 flex items-center">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {policy.note}
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-500 ml-4">/{policy.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Analysis */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl">
                <h3 className="font-bold text-green-800 mb-3 flex items-center">
                  <Stethoscope className="w-5 h-5 mr-2" />
                  对医生的影响
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>统一收费标准，便于向患者解释费用构成</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>明确数据上传要求，需完善病历记录流程</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>政策支持技术创新，可按现有项目兼容新技术</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  对患者的影响
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>收费更加透明规范，便于了解费用明细</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>政府指导价为最高限价，实际收费可能更低</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>部分项目已纳入医保，减轻患者负担</span>
                  </li>
                </ul>
              </div>

              {/* Download Button */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                <FileText className="w-4 h-4 mr-2" />
                下载政策原文 (PDF)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Anatomy Education Animation Modal */}
      {showAnatomyEducation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowAnatomyEducation(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-5 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    手术科普动画
                  </h2>
                  <p className="text-purple-100 text-sm mt-1">了解机器人辅助手术的全过程</p>
                </div>
                <button onClick={() => setShowAnatomyEducation(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Surgery Type Tabs */}
              <div className="flex space-x-2 mt-4 overflow-x-auto pb-1">
                {Object.entries(anatomyEducation).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => { setSelectedAnatomy(key); setAnimationStep(0); }}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedAnatomy === key 
                        ? 'bg-white text-purple-600' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {value.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-5 space-y-5">
              {/* Surgery Info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{anatomyEducation[selectedAnatomy].name}</h3>
                <p className="text-gray-500 text-sm">{anatomyEducation[selectedAnatomy].subtitle}</p>
                <p className="text-gray-600 mt-2">{anatomyEducation[selectedAnatomy].description}</p>
              </div>

              {/* Animation Area */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 relative overflow-hidden">
                {/* Animated Joint Visualization */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {/* Joint SVG Animation */}
                    <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
                      {selectedAnatomy === 'tka' || selectedAnatomy === 'uka' ? (
                        // Knee Joint
                        <>
                          <ellipse cx="100" cy="60" rx="45" ry="50" fill="#E8D5B7" stroke="#8B7355" strokeWidth="2" className={animationStep >= 2 ? 'opacity-50' : ''} />
                          <ellipse cx="100" cy="150" rx="35" ry="40" fill="#E8D5B7" stroke="#8B7355" strokeWidth="2" className={animationStep >= 3 ? 'opacity-50' : ''} />
                          {animationStep >= 2 && (
                            <ellipse cx="100" cy="60" rx="42" ry="47" fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" />
                          )}
                          {animationStep >= 4 && (
                            <>
                              <ellipse cx="100" cy="60" rx="43" ry="48" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
                              <ellipse cx="100" cy="150" rx="33" ry="38" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
                              <rect x="85" y="100" width="30" height="10" fill="#CBD5E1" rx="2" />
                            </>
                          )}
                          <circle cx="160" cy="40" r="8" fill="#3B82F6" className="animate-ping" style={{animationDuration: '2s'}} />
                          <text x="160" y="60" textAnchor="middle" className="text-xs fill-blue-600">机器人</text>
                        </>
                      ) : selectedAnatomy === 'tha' ? (
                        // Hip Joint
                        <>
                          <circle cx="100" cy="80" r="50" fill="#E8D5B7" stroke="#8B7355" strokeWidth="2" className={animationStep >= 2 ? 'opacity-50' : ''} />
                          <circle cx="100" cy="80" r="25" fill="#D4C4A8" stroke="#8B7355" strokeWidth="2" />
                          <line x1="100" y1="105" x2="100" y2="180" stroke="#8B7355" strokeWidth="15" className={animationStep >= 3 ? 'opacity-50' : ''} />
                          {animationStep >= 4 && (
                            <>
                              <circle cx="100" cy="80" r="48" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
                              <circle cx="100" cy="80" r="20" fill="#64748B" />
                              <line x1="100" y1="100" x2="100" y2="175" stroke="#64748B" strokeWidth="12" />
                            </>
                          )}
                          <circle cx="160" cy="50" r="8" fill="#3B82F6" className="animate-ping" style={{animationDuration: '2s'}} />
                        </>
                      ) : (
                        // Spine
                        <>
                          {[0, 1, 2, 3, 4].map((i) => (
                            <g key={i}>
                              <rect x="75" y={30 + i * 35} width="50" height="28" rx="5" fill={animationStep >= 4 ? '#94A3B8' : '#E8D5B7'} stroke="#8B7355" strokeWidth="2" />
                              {animationStep >= 4 && (
                                <>
                                  <circle cx="60" cy={44 + i * 35} r="4" fill="#64748B" />
                                  <circle cx="140" cy={44 + i * 35} r="4" fill="#64748B" />
                                  <line x1="60" y1={44 + i * 35} x2="75" y2={44 + i * 35} stroke="#64748B" strokeWidth="2" />
                                  <line x1="125" y1={44 + i * 35} x2="140" y2={44 + i * 35} stroke="#64748B" strokeWidth="2" />
                                </>
                              )}
                            </g>
                          ))}
                          {animationStep >= 4 && (
                            <line x1="60" y1="44" x2="60" y2="184" stroke="#64748B" strokeWidth="3" />
                          )}
                          {animationStep >= 4 && (
                            <line x1="140" y1="44" x2="140" y2="184" stroke="#64748B" strokeWidth="3" />
                          )}
                          <circle cx="160" cy="100" r="8" fill="#3B82F6" className="animate-ping" style={{animationDuration: '2s'}} />
                        </>
                      )}
                    </svg>
                  </div>
                </div>

                {/* Step Progress */}
                <div className="flex justify-center space-x-2 mb-4">
                  {anatomyEducation[selectedAnatomy].steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAnimationStep(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        animationStep === idx ? 'bg-purple-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Current Step Info */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{anatomyEducation[selectedAnatomy].steps[animationStep]?.icon}</span>
                    <span className="text-sm text-purple-600 font-medium">
                      步骤 {animationStep + 1} / {anatomyEducation[selectedAnatomy].steps.length}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900">
                    {anatomyEducation[selectedAnatomy].steps[animationStep]?.title}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {anatomyEducation[selectedAnatomy].steps[animationStep]?.desc}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center space-x-4 mt-4">
                  <button 
                    onClick={() => setAnimationStep(Math.max(0, animationStep - 1))}
                    disabled={animationStep === 0}
                    className="p-3 bg-white rounded-full shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setAnimationStep(0)}
                    className="p-3 bg-white rounded-full shadow hover:bg-gray-50"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setAnimationStep(Math.min(anatomyEducation[selectedAnatomy].steps.length - 1, animationStep + 1))}
                    disabled={animationStep === anatomyEducation[selectedAnatomy].steps.length - 1}
                    className="p-3 bg-white rounded-full shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Surgery Details */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">手术时长</p>
                  <p className="font-bold text-blue-600">{anatomyEducation[selectedAnatomy].duration}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">恢复时间</p>
                  <p className="font-bold text-green-600">{anatomyEducation[selectedAnatomy].recovery}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">假体寿命</p>
                  <p className="font-bold text-purple-600">{anatomyEducation[selectedAnatomy].lifespan}</p>
                </div>
              </div>

              {/* Suitable Patients */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-bold text-green-800 mb-3 flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    适应症
                  </h4>
                  <ul className="space-y-2">
                    {anatomyEducation[selectedAnatomy].suitable.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-xl">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center">
                    <X className="w-5 h-5 mr-2" />
                    禁忌症
                  </h4>
                  <ul className="space-y-2">
                    {anatomyEducation[selectedAnatomy].notSuitable.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Advantages */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  机器人手术优势
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {anatomyEducation[selectedAnatomy].advantages.map((item, idx) => (
                    <div key={idx} className="flex items-center bg-white p-2 rounded-lg text-sm">
                      <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { setShowAnatomyEducation(false); setSelectedIndication(selectedAnatomy); }}
                  className="bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  查看相关产品
                </button>
                <button 
                  onClick={() => setShowConsult(true)}
                  className="bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  咨询医生
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom padding for fixed toolbar */}
      <div className="h-16"></div>
    </div>
  );
};

export default OrthoRobotWeb;
