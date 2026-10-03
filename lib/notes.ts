import snapshot from "./content/notion-snapshot.json";
import type { ContentBlock } from "./content/blocks";

export type NoteSection = {
  id?: string;
  level?: number;
  role?: "excerpt" | "reflection";
  blocks?: ContentBlock[];
  heading: string;
  paragraphs: string[];
};

export type Note = {
  pageId?: string;
  slug: string;
  number: string;
  title: string;
  titleZh: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  readingTime: string;
  tags: string[];
  signal: string;
  linkedProject?: { label: string; href: string };
  kind?: "blog" | "reading";
  allowAssistant?: boolean;
  updatedAt?: string;
  source?: { title: string; author?: string; url?: string; location?: string };
  sections: NoteSection[];
};

const seedNotes: Note[] = [
  {
    slug: "recovery-is-part-of-the-agent",
    number: "01",
    title: "Recovery is part of the agent",
    titleZh: "Agent 失败之后，怎样接着做？",
    excerpt:
      "代码 Agent 难免会遇到工具报错、测试失败或修改冲突。关键在于，它能不能记住这次失败，并据此调整下一步。",
    date: "2026-10-02",
    dateLabel: "2026 年 10 月 2 日",
    readingTime: "约 5 分钟",
    tags: ["Agents", "Recovery", "Runtime"],
    signal: "记录失败 → 调整计划 → 继续执行",
    linkedProject: {
      label: "Coding Agent Policy Optimization",
      href: "/work/coding-agent-policy-optimization",
    },
    sections: [
      {
        heading: "先把失败记录下来",
        paragraphs: [
          "代码 Agent 在仓库里工作时，可能遇到修改冲突、测试失败、上下文丢失，也可能反复调用工具却没有进展。如果每次失败都只重新发一条提示，很多有用的信息就丢了：哪些文件变了、已经试过哪些办法、上一步为什么没成功。",
          "运行时需要把这些失败记成明确的状态。测试没通过、文件还没读、补丁发生冲突，都应该影响下一步怎么做。否则，再调用一次模型，很可能还是沿着原来的思路打转。",
        ],
      },
      {
        heading: "重试之前，要先知道什么变了",
        paragraphs: [
          "恢复时，先保留已经完成且仍然有效的工作，再核对当前文件版本。可能被修改过的内容要重新读取。有了新的依据，或者换了执行方案，下一次尝试才有意义。",
          "模型和运行时在这里各有职责：模型提出下一步，运行时检查它依据的信息是否还有效、哪些文件必须重读，以及什么时候该停止重复尝试。",
        ],
      },
      {
        heading: "除了成功率，还要看什么",
        paragraphs: [
          "只看任务成功率，很难判断改进来自哪里。我还会看失败后恢复了多少次、工具调用有没有重复、结果是否经过检查，以及恢复从哪一步开始。这些信息有助于分清模型判断和运行时机制各自起了什么作用。",
          "我希望每次失败都能查清原因，重复尝试有明确的停止条件，已经完成的工作也能保留下来。",
        ],
      },
    ],
  },
  {
    slug: "compress-the-verbs-keep-the-tools",
    number: "02",
    title: "Compress the verbs. Keep the tools.",
    titleZh: "少生成重复动作，工具照常执行",
    excerpt:
      "重复的动作描述可以压缩，但工具名、路径和参数必须说清楚。这是我理解 LAR 时最关注的边界。",
    date: "2026-09-26",
    dateLabel: "2026 年 9 月 26 日",
    readingTime: "约 6 分钟",
    tags: ["LAR", "Post-training", "Efficiency"],
    signal: "从文本动作到潜在动作",
    linkedProject: {
      label: "Latent Action Reparameterization",
      href: "/work/latent-action-reparameterization",
    },
    sections: [
      {
        heading: "重复描述也在消耗生成时间",
        paragraphs: [
          "长任务里，Agent 经常重复描述检查、分析、检索、准备和继续执行。这些文字有时没有带来多少新信息，却仍然占用生成时间。",
          "LAR 研究的问题是：能否把这些高频、变化不大的动作片段表示得更紧凑，同时保留后续任务需要的行为。",
        ],
      },
      {
        heading: "工具需要的参数，不能省",
        paragraphs: [
          "工具名、搜索词、文件路径和调用参数仍然需要准确的文本。因此，要先区分哪些动作描述可以压缩，哪些内容必须原样传给工具。",
          "这个区分直接关系到工具能否执行。一个潜在动作可以替代熟悉的推理片段，但不能让搜索词或修改指令变得含糊。",
        ],
      },
      {
        heading: "少生成了，还能不能做好任务",
        paragraphs: [
          "项目记录同时报告了动作 token 用量、任务指标和吞吐量。判断压缩是否有效，需要一起看：生成量减少了多少，任务表现是否保住，换到其他任务时工具还能否正常执行。",
          "对我来说，效率提升要有三方面的依据：动作生成更少，任务质量保持住，执行过程也能查清楚。",
        ],
      },
    ],
  },
  {
    slug: "evidence-before-interface",
    number: "03",
    title: "Evidence before interface",
    titleZh: "展示项目之前，先想清楚拿什么证明",
    excerpt:
      "一次顺利的演示让人看到效果。要把项目讲清楚，还得说明它为什么能工作、在哪些情况下会失效，以及哪些结果已经验证过。",
    date: "2026-09-18",
    dateLabel: "2026 年 9 月 18 日",
    readingTime: "约 4 分钟",
    tags: ["Evaluation", "Portfolio", "Systems"],
    signal: "问题 → 方法 → 验证结果",
    linkedProject: {
      label: "Selected work",
      href: "/#work",
    },
    sections: [
      {
        heading: "演示成功之后，还需要验证什么",
        paragraphs: [
          "一段成功的录屏，说明某个流程在当时的环境里跑通了。失败后能不能恢复、换个任务是否有效、模型表现怎样、能否稳定上线，还需要分别验证。",
          "展示项目时，我希望读者能看出哪些行为实际跑过，哪些还只是设计设想。",
        ],
      },
      {
        heading: "讲项目时，我会先回答三个问题",
        paragraphs: [
          "第一，这个项目想解决什么具体问题？第二，用了什么方法，它如何改变系统的行为？第三，别人可以通过什么记录、测试或运行结果来核对？",
          "按问题、方法和验证结果来组织内容，读者更容易抓住重点。我也能更早发现哪里还缺依据，避免页面做得很完整，实际实现却没有跟上。",
        ],
      },
      {
        heading: "把结论说到证据能支持的地方",
        paragraphs: [
          "如果数字来自项目记录、图示是根据源码整理的，或者基准测试没有重新跑过，就把这些情况写清楚。读者需要知道结论的依据，以及哪些地方还不能确定。",
          "已经验证的行为、项目记录中的结果和下一步计划，各自说清楚，项目反而更容易被理解。",
        ],
      },
    ],
  },
];

export const publishedContent: Note[] = (snapshot.enabled ? snapshot.posts as Note[] : seedNotes.map(note => ({ ...note, allowAssistant: true })))
  .slice().sort((a, b) => b.date.localeCompare(a.date));
export const notes = publishedContent.filter((note) => note.kind !== "reading");
export const readingNotes = publishedContent.filter((note) => note.kind === "reading");
export const contentVersion = snapshot.version;

export function contentHref(note: Note) {
  return `${note.kind === "reading" ? "/bookshelf" : "/notes"}/${note.slug}`;
}

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}
