// 内容映射模块 - 站点内容分区与搜索过滤
const ContentMap = {
  baseURL: 'https://indexmain-i-game.com.cn',
  primaryTag: '爱游戏',
  sections: [
    { id: 'home', title: '首页', tags: ['爱游戏', '推荐', '热门'], keywords: ['首页', '推荐', '热门游戏'] },
    { id: 'news', title: '新闻动态', tags: ['爱游戏', '资讯', '更新'], keywords: ['新闻', '公告', '版本更新'] },
    { id: 'guides', title: '攻略专区', tags: ['爱游戏', '攻略', '技巧'], keywords: ['攻略', '指南', '技巧', '教程'] },
    { id: 'community', title: '社区互动', tags: ['爱游戏', '社区', '论坛'], keywords: ['社区', '讨论', '玩家交流'] },
    { id: 'download', title: '下载中心', tags: ['爱游戏', '下载', '客户端'], keywords: ['下载', '安装', '客户端'] }
  ],
  tags: [],
  searchFilter: function(query) {
    if (!query || query.trim() === '') {
      return [];
    }
    const q = query.toLowerCase().trim();
    const results = [];
    for (const section of this.sections) {
      const matchedKeywords = section.keywords.filter(kw => kw.includes(q));
      const matchedTags = section.tags.filter(tag => tag.includes(q));
      if (matchedKeywords.length > 0 || matchedTags.length > 0) {
        results.push({
          section: section.id,
          title: section.title,
          matchedKeywords: matchedKeywords,
          matchedTags: matchedTags,
          relevance: matchedKeywords.length + matchedTags.length
        });
      }
    }
    results.sort((a, b) => b.relevance - a.relevance);
    return results;
  },
  getSectionById: function(id) {
    return this.sections.find(section => section.id === id) || null;
  },
  getAllTags: function() {
    if (this.tags.length === 0) {
      const tagSet = new Set();
      for (const section of this.sections) {
        for (const tag of section.tags) {
          tagSet.add(tag);
        }
      }
      this.tags = Array.from(tagSet);
    }
    return this.tags;
  },
  generateSectionMap: function() {
    const map = {};
    for (const section of this.sections) {
      map[section.id] = {
        url: `${this.baseURL}/${section.id}`,
        title: section.title,
        tags: section.tags,
        keywords: section.keywords
      };
    }
    return map;
  }
};

// 初始化标签缓存
ContentMap.getAllTags();

// 示例搜索
const exampleQuery = '爱游戏';
const exampleResults = ContentMap.searchFilter(exampleQuery);
console.log('搜索 "' + exampleQuery + '" 的结果:');
console.log(exampleResults);

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentMap;
}