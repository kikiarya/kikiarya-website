"""Generate portfolio SVGs and editable Obsidian Mermaid from one curated source."""
import json
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
VAULT = Path('E:/workspace/Obsidian/04-项目资料库/项目深挖手册_20260927/架构图谱')

def flow(key, title, nodes, edges, note, sources):
    return dict(key=key, title=title, kind='flow', nodes=nodes, edges=edges, note=note, sources=sources)

def sequence(title, actors, messages, note, sources):
    return dict(key='failure', title=title, kind='sequence', actors=actors, messages=messages, note=note, sources=sources)

projects = [
dict(slug='latent-action-reparameterization', title='LAR · 动作表示学习', status='从动作词表构建、蒸馏训练到工具可执行性', repo='OpenClaw_LAR', diagrams=[
flow('architecture','从轨迹到动作词表',[
['原始轨迹','保留任务与动作上下文'],['候选片段','词 n-gram / HTML 片段'],['频率与熵','基于样本统计下一词分布'],['片段映射','最长片段优先替换'],['配对训练','原始 / 压缩轨迹'],['策略优化与评测','蒸馏之后继续优化策略']],[[0,1,'抽取'],[1,2,'排序'],[2,3,'选入词表'],[3,4,'<seg_n>'],[4,5,'研究流程']],
'挖掘分数结合频率与经验熵，用来筛选高频、可压缩的动作片段；它并不等同于语义意图识别。当前公开训练入口以蒸馏流程为主。',['identify_segments.py','create_token_mapping.py','train.py']),
flow('mechanism','教师与学生如何对齐',[
['原始文本','完整轨迹输入'],['冻结教师','提供参考分布'],['共有文本位置','只比较能够对应的位置'],['压缩文本','片段映射为新 token'],['LoRA 学生','q / k / v / o 投影'],['蒸馏目标','加权 CE 与 KL']],[[0,1,'teacher'],[1,2,'概率分布'],[3,4,'student'],[4,2,'概率分布'],[2,5,'KL'],[4,5,'CE']],
'两个序列长度不同，不能按相同下标直接比较。图展示本地损失通路；具体实验的 KL 权重以配置为准。',['train.py','utils.py']),
sequence('工具可执行性的边界',['策略','文本解码','工具环境'],[[0,1,'生成压缩轨迹与文本参数'],[1,2,'提交可解析的工具标签与参数'],[2,1,'返回结果或解析失败'],[1,0,'反馈进入后续轨迹']],
'需要注意：压缩率不能替代可执行性验证。应分别统计解析失败、参数错误和任务失败；本图不表示已经实现自动纠错。',['evaluate_triviaqa.py'])]),
dict(slug='pixverse-realtime-agent', title='PixVerse · 实时交互链路', status='依据历史实习资料整理；当前未找到源码', repo=None, diagrams=[
flow('architecture','控制信令与媒体分流',[
['用户交互','输入与播放控制'],['WebSocket / Session','会话与任务状态'],['GenerationTask','生成生命周期'],['视频播放','接收连续视频'],['Agora / WebRTC','媒体传输通道'],['分段生成','SegmentGenerator / VideoExtender']],[[0,1,'控制'],[1,2,'调度'],[2,5,'生成'],[5,4,'视频'],[4,3,'播放']],
'依据历史项目笔记重建的概念架构。控制面与媒体面分开说明；不据此声称底层媒体握手优化或 R2 架构由本人实现。',['历史实习笔记：实时视频生成项目']),
flow('mechanism','交互到任务的状态关联',[
['Suggestion','建议交互入口'],['上下文组装','世界信息与用户输入'],['LLM Task Branch','输出结构适配'],['Session 标识','当前交互归属'],['GenerationTask 标识','任务生命周期'],['前端展示','生成状态与建议']],[[0,1,'输入'],[1,2,'推理'],[2,4,'任务'],[3,4,'关联'],[4,5,'同步']],
'图中重点展示 Suggestion、LLM 分支和 Session / Task 同步。具体状态枚举与消息字段仍需结合原始源码确认。',['历史实习笔记：LLM 模块与 Session 映射']),
sequence('晚到结果：并发任务设计推演',['前端','Session','生成任务'],[[0,1,'发起任务 A'],[1,2,'启动任务 A'],[0,1,'中断后发起任务 B'],[2,1,'任务 A 的结果晚到'],[1,0,'建议：确认任务归属后再展示']],
'待验证设计：可以通过任务标识或执行代次过滤旧结果。这不代表相关隔离机制已经上线，也不代表线上发生过这类事故。',['设计推演；非已实现证明'])]),
dict(slug='openclaw-stateful-agent-runtime', title='OpenClaw · 静态上下文压缩', status='当前本地实现；历史恢复指标未沿用', repo='OpenClaw_LAR', diagrams=[
flow('architecture','从真实输入到静态片段',[
['LLM 输入追踪','采集真实提示词'],['静态内容准备','识别动态上下文边界'],['片段挖掘','高频低熵候选'],['词表构建','建立 <seg_n> 映射'],['蒸馏训练','保持行为分布'],['对照组合','Short / Medium / Long / All']],[[0,1,'提取'],[1,2,'供挖掘'],[2,3,'候选'],[3,4,'训练'],[4,5,'对照']],
'Project Context / Workspace Files 的边界裁剪发生在片段挖掘的准备阶段，不能把它画成运行时删除动态上下文。当前源码也不能证明已经实现动态检查点恢复。',['scripts/extract_openclaw_tracer_llm_inputs.py','scripts/prepare_openclaw_system_for_segment_mining.py','train.py']),
flow('mechanism','压缩率与严格 EM 分开看',[
['Vanilla','压缩 0% / EM 42.18%'],['Short','压缩 6.7% / EM 53.58%'],['Medium','压缩 15.2% / EM 46.72%'],['Long','压缩 24.7% / EM 46.68%'],['AllStatic','压缩 45.3% / EM 43.08%'],['决策原则','联合评估成本与质量']],[[0,5,'基线'],[1,5,'对照'],[2,5,'对照'],[3,5,'对照'],[4,5,'对照']],
'报告结果采用严格 EM；当前 evaluate_triviaqa.py 的 substring 评分方式与该口径不一致，复现实验前需要先找到对应版本的评测脚本。',['README.md','evaluate_triviaqa.py','实验记录：严格 EM']),
sequence('压缩后的失败应如何定位',['评估器','压缩策略','工具环境'],[[0,1,'相同任务与预算'],[1,2,'输出工具请求'],[2,0,'记录解析与执行结果'],[1,0,'最终答案'],[0,0,'严格 EM 与 token 成本分别统计']],
'诊断方案：区分工具格式损坏和答案错误，再分析片段覆盖。图中的逐类统计是评估建议，不声称当前评估器已完整实现。',['evaluate_triviaqa.py','评估设计'])]),
dict(slug='ai-career-copilot', title='Career Copilot · 证据驱动工作流', status='源码核对；工作流并非多 Agent 自主协作', repo='AI-Career-Copilot', diagrams=[
flow('architecture','从用户证据到产物',[
['用户与 API','岗位输入 / 候选经历'],['持久化任务记录','输入快照与幂等键'],['Worker','领取任务 / 心跳'],['模型网关','结构校验 / 重试'],['五步工作流','分析 → 匹配 → 诊断'],['产物草稿','准备计划与证据引用']],[[0,1,'创建'],[1,2,'领取'],[2,4,'执行'],[4,3,'模型步骤'],[3,4,'结构化结果'],[4,5,'生成']],
'本地工作流包含关键词证据匹配和模型处理步骤，但不能因此视为已经实现向量检索、Reranker 或 LangGraph 多 Agent。',['apps/worker/src/workflow.js','packages/persistence/src/index.js']),
flow('mechanism','证据状态约束生成',[
['需求分析','结构化岗位要求'],['证据匹配','关键词匹配'],['证据状态','confirmed / partial / missing'],['能力诊断','区分证据与缺口'],['准备计划','围绕缺口给建议'],['草稿生成','仅引用 confirmed 证据']],[[0,1,'需求'],[1,2,'分级'],[2,3,'诊断'],[3,4,'计划'],[4,5,'草稿'],[2,5,'引用白名单']],
'引用 ID 采用白名单约束，只能证明引用确实存在；不能据此认定生成内容的每一句话都有对应证据支持。',['apps/worker/src/workflow.js']),
sequence('租约过期后的旧 Worker 风险',['Worker A','任务记录','Worker B'],[[0,1,'领取并开始执行'],[1,2,'租约过期，重新领取'],[0,1,'旧 Worker 晚到的完成写入'],[1,1,'只检查 running 无法区分执行代次'],[2,1,'建议：写入时携带 attempt / owner']],
'当前边界：任务被重新领取，不代表旧 Worker 已经停止。完成写入还需要校验执行代次；图中的最后一步是改进建议，并非现有保证。',['apps/worker/src/index.js','packages/persistence/src/index.js'])]),
dict(slug='distributed-ecommerce-microservices', title='Commerce · 工具与交易边界', status='源码核对；区分编排与事务保证', repo='distributed-agent-commerce_分布式智能Agent电商平台', diagrams=[
flow('architecture','客服与交易各自负责什么',[
['用户会话','咨询或购买意图'],['规则路由','FAQ / 业务查询'],['可选 LLM','组织回答措辞'],['Checkout','草稿 / 报价 / 确认'],['Order / Payment','库存与支付状态'],['Outbox','提交后投递消息']],[[0,1,'咨询'],[1,2,'回答'],[0,3,'购买'],[3,4,'完成结算'],[4,5,'事件']],
'客服链路并不是由模型自主完成的多工具循环。SSE 只是把完整文本分块发送，不能称为模型 token 的原生流式输出。',['storefront/server/services/chatService.js','CheckoutService.java','OrderService.java']),
flow('mechanism','结算状态与失效边界',[
['DRAFT','编辑购物内容'],['QUOTED','报价与有效期'],['CONFIRMED','用户确认'],['修改草稿','报价失效'],['COMPLETED','关联订单'],['仍需加强的校验','确认版本 / 完成幂等']],[[0,1,'报价'],[1,2,'确认'],[2,4,'完成'],[1,3,'修改'],[3,0,'重置'],[2,5,'边界审查']],
'报价有效期为 30 分钟。确认接口未要求 expected quote version；完成入口先检查状态，重复请求的返回语义仍需加强。',['CheckoutService.java']),
sequence('支付 UNKNOWN 与异步消息',['订单服务','银行','Outbox'],[[0,1,'发起支付或查询'],[1,0,'UNKNOWN（结果未知）'],[0,0,'保留待确认，后续对账'],[1,0,'确认成功'],[0,2,'写入订单事件'],[2,2,'确认发布后写入 sentAt']],
'UNKNOWN 不等于失败，因此不应直接回补库存。Outbox 在消息确认后、状态标记前仍存在崩溃重投窗口；另外，Checkout 的外层事务范围可能包含银行调用，不能声称网络调用已经位于物理事务之外。',['OrderService.java','MessagePublisher.java','OutboxDispatcher.java'])])
]

def svg(d):
    seq=d['kind']=='sequence'
    h=650 if seq else 540
    out=[f'<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="{h}" viewBox="0 0 1000 {h}" role="img" aria-labelledby="title desc">',f'<title id="title">{escape(d["title"])}</title>',f'<desc id="desc">{escape(d["note"])}</desc>', '<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="none" stroke="#a34b66"/></marker></defs>',f'<rect width="1000" height="{h}" rx="24" fill="#fff8f5"/>','<g font-family="Segoe UI,Microsoft YaHei,sans-serif" fill="#452f3a">',f'<text x="38" y="48" font-size="23" font-weight="600">{escape(d["title"])}</text>', '<text x="38" y="78" font-size="12" fill="#936776">SYSTEM ATLAS / 2026.09 · READ THE BOUNDARIES BELOW</text>']
    if seq:
        xs=[170,500,830]
        for i,a in enumerate(d['actors']):
            x=xs[i]
            out += [f'<rect x="{x-120}" y="104" width="240" height="54" rx="12" fill="#f3dce3"/>',f'<text x="{x}" y="138" text-anchor="middle" font-size="18">{escape(a)}</text>',f'<path d="M{x} 170 V610" stroke="#d6b5c0" stroke-dasharray="5 7"/>']
        for i,(a,b,t) in enumerate(d['messages']):
            y=213+i*66; x=xs[a]; z=xs[b]
            p=f'M{x} {y} H{z}' if a!=b else f'M{x} {y} h65 v24 h-65'
            out += [f'<path d="{p}" fill="none" stroke="#a34b66" stroke-width="1.7" marker-end="url(#arrow)"/>', f'<text x="{(x+z)/2 if a!=b else min(x+65,960)}" y="{y-12}" text-anchor="{ "middle" if a!=b else "end"}" font-size="14">{i+1}. {escape(t)}</text>']
    else:
        pos=[(40+(i%3)*325,130+(i//3)*240) for i in range(len(d['nodes']))]
        for a,b,t in d['edges']:
            x,y=pos[a]; z,w=pos[b]
            if y==w:
                sx=x+270 if z>x else x; ex=z if z>x else z+270
                p=f'M{sx} {y+49} H{ex}'; tx=(sx+ex)/2; ty=y+38
            else:
                sx=x+135; ex=z+135; sy=y+98 if w>y else y; ey=w if w>y else w+98
                mid=(sy+ey)/2
                p=f'M{sx} {sy} V{mid} H{ex} V{ey}'; tx=(sx+ex)/2; ty=mid-9
            out += [f'<path d="{p}" fill="none" stroke="#bd8093" stroke-width="1.6" marker-end="url(#arrow)"/>',f'<text x="{tx}" y="{ty}" text-anchor="middle" font-size="12" fill="#874b60">{escape(t)}</text>']
        for i,(a,b) in enumerate(d['nodes']):
            x,y=pos[i]
            out += [f'<rect x="{x}" y="{y}" width="270" height="98" rx="15" fill="{ "#f3dce3" if i==len(pos)-1 else "#fffdfb"}" stroke="#dfbec9"/>',f'<text x="{x+18}" y="{y+34}" font-size="18" font-weight="600">{escape(a)}</text>',f'<text x="{x+18}" y="{y+65}" font-size="13" fill="#805c6a">{escape(b)}</text>']
    return ''.join(out+['</g></svg>'])

def mermaid(d):
    if d['kind']=='sequence':
        lines=['sequenceDiagram']+[f'    participant A{i} as {a}' for i,a in enumerate(d['actors'])]
        lines += [f'    A{a}->>A{b}: {t}' for a,b,t in d['messages']]
    else:
        lines=['flowchart LR']+[f'    N{i}["{a}<br/>{b.replace("<", "&lt;").replace(">", "&gt;")}"]' for i,(a,b) in enumerate(d['nodes'])]
        lines += [f'    N{a} -->|"{t.replace("<", "&lt;").replace(">", "&gt;")}"| N{b}' for a,b,t in d['edges']]
    return '\n'.join(lines)

def main():
    dest=ROOT/'public/diagrams'; dest.mkdir(parents=True,exist_ok=True)
    VAULT.mkdir(parents=True,exist_ok=True)
    index=['# 五项目架构图谱','', '每个项目包含架构、核心机制和失败边界。图示区分源码事实、历史资料与建议设计。','']
    for p in projects:
        md=[f'# {p["title"]}', '', f'证据状态：{p["status"]}', '', '图的箭头表示数据或控制关系，不自动代表数据库事务、网络请求次数或性能结论。', '']
        for d in p['diagrams']:
            name=f'{p["slug"]}-{d["key"]}.svg'; d['asset']='/diagrams/'+name
            (dest/name).write_text(svg(d),encoding='utf-8')
            md += [f'## {d["title"]}', '', '```mermaid', mermaid(d), '```', '', d['note'], '', '依据：'+ '；'.join(d['sources']), '']
        md += ['## 面试讲图顺序','','1. 说明输入、输出和自己负责的模块。','2. 沿一条真实请求讲清状态和数据如何变化。','3. 指出一处失败窗口及当前实现的边界。','4. 将改进建议与已完成工作分别表达。','']
        name=p['slug']+'.md'; (VAULT/name).write_text('\n'.join(md),encoding='utf-8')
        if p['repo']:
            repo_docs=ROOT.parent/p['repo']/'docs'/'architecture-atlas'
            repo_docs.mkdir(parents=True,exist_ok=True)
            (repo_docs/name).write_text('\n'.join(md),encoding='utf-8')
            for d in p['diagrams']:
                (repo_docs/Path(d['asset']).name).write_text(svg(d),encoding='utf-8')
        index += [f'- [{p["title"]}]({name})：{p["status"]}']
    (VAULT/'00-图谱导航.md').write_text('\n'.join(index)+'\n',encoding='utf-8')
    (ROOT/'lib/project-atlas.json').write_text(json.dumps(projects,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'Generated {sum(len(p["diagrams"]) for p in projects)} SVGs and {len(projects)+1} Obsidian notes.')

if __name__=='__main__': main()
