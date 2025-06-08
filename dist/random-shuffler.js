// ==UserScript==
// @name         Random Shuffler
// @author       zaozao
// @version      1.1.6
// @description  随机打乱参数顺序的指令
// @timestamp    1749383553
// @license      Apache-2
// @homepageURL  https://github.com/zaozao2333/seal-dice-js
// ==/UserScript==

(()=>{function x(){let o=seal.ext.find("RandomShuffler");o||(o=seal.ext.new("RandomShuffler","zaozao","1.1.5"),seal.ext.register(o),seal.ext.registerStringConfig(o,"who_prefix",`\u4EA4\u7ED9\u6211\u6765\u5206\u914D\u5417\uFF1F\u6211\u660E\u767D\u4E86\uFF1A
`,"\u968F\u673A\u5206\u914D\u7ED3\u679C\u7684\u524D\u7F00\u6587\u672C"));let n=seal.ext.newCmdItemInfo();n.name="who",n.help=`\u968F\u673A\u6253\u4E71\u53C2\u6570\u987A\u5E8F
.who \u9009\u98791 \u9009\u98792 ... \u6216 .who @\u7528\u62371 @\u7528\u62372`,n.allowDelegate=!0,n.solve=(a,h,r)=>{a.delegateText="";let i=seal.ext.getStringConfig(o,"who_prefix")||`\u4EA4\u7ED9\u6211\u6765\u5206\u914D\u5417\uFF1F\u6211\u660E\u767D\u4E86\uFF1A
`,t=[];t=[...r.args];for(let e of r.at)t.push(`${e.userId}`);if(t.length<2){let e=seal.ext.newCmdExecuteResult(!0);return e.showHelp=!0,e}for(let e=t.length-1;e>0;e--){let l=Math.floor(Math.random()*(e+1));[t[e],t[l]]=[t[l],t[e]]}let s=i;return t.forEach((e,l)=>{let f=e.match(/[1-9]\d{4,11}/),u=f?f[0]:e;s+=`${l+1}. ${u}
`}),seal.replyToSender(a,h,s),seal.ext.newCmdExecuteResult(!0)},o.cmdMap.who=n}x();})();
