function main() {
  let ext = seal.ext.find('RandomShuffler');
  if (!ext) {
    ext = seal.ext.new('RandomShuffler', 'zaozao', '1.1.5');
    seal.ext.register(ext);

    // 注册字符串类型的配置项，用于自定义结果前缀
    seal.ext.registerStringConfig(
      ext,
      'who_prefix',
      '交给我来分配吗？我明白了：\n',
      '随机分配结果的前缀文本'
    );
  }

  const cmdWho = seal.ext.newCmdItemInfo();
  cmdWho.name = 'who';
  cmdWho.help = '随机打乱参数顺序\n.who 选项1 选项2 ... 或 .who @用户1 @用户2';

  // 代骰模式
  cmdWho.allowDelegate = true;

  cmdWho.solve = (ctx, msg, cmdArgs) => {
    // 清除代骰前缀显示
    ctx.delegateText = "";

    // 获取配置的前缀文本，如果未设置则使用默认值
    const prefix = seal.ext.getStringConfig(ext, 'who_prefix') || '交给我来分配吗？我明白了：\n';

    // 1. 获取所有参数：普通参数 + 艾特参数
    let options = [];

    // 添加普通参数
    options = [...cmdArgs.args];

    // 获取艾特信息
    for (const atInfo of cmdArgs.at) {
      options.push(`${atInfo.userId}`);
    }

    // 2. 如果没有有效参数，显示帮助
    if (options.length < 2) {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }

    // 3. Fisher-Yates洗牌算法
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    // 4. 构建结果
    let result = prefix;  // 使用配置的前缀
    options.forEach((item, index) => {
      // 使用正则提取纯数字QQ号
      const qqMatch = item.match(/[1-9]\d{4,11}/); // 匹配5-12位QQ号
      const displayText = qqMatch ? qqMatch[0] : item; // 优先用纯数字，否则原文本
      result += `${index + 1}. ${displayText}\n`;
    });

    seal.replyToSender(ctx, msg, result);
    return seal.ext.newCmdExecuteResult(true);
  };

  // 注册指令
  ext.cmdMap['who'] = cmdWho;
}

main();
