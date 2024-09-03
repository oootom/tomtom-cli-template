# tomtom-cli-template

## 概述

- 使用这个模板可以快速初始化一个 Node.js CLI 项目；
- 使用 Yarn + Monorepo + Changesets + yargs + Jest + TypeScript + Ink + Zod；



## 命令行工具

命令行工具或程序对程序员来说很常用，在完成特定任务时，命令行工具能极大的提高开发效率。常见的脚手架工具一般使用以下语言进行开发，它们各自有不同的优势：

- Python：
  - 语法简洁，适合初学者；
  - 拥有庞大的标准库和第三方库；
  - 可以在多种操作系统上运行；
  - 高级数据结构和动态类型，便于快速开发；
- Bash：
  - 适合编写简单或中等复杂度的脚本，尤其是在 Linux 和 UNIX 系统上；
  - 内置大量命令和工具，方便进行文件操作、文本处理等；
- JavaScript (Node.js)：
  - 拥有一个活跃的开发者社区和大量的第三方库；
  - 异步非阻塞 I/O 使其在处理高并发、I/O 密集型任务时表现出色；
  - 对于前端开发者来说，几乎没有入门门槛；
- Go：
  - 编译成机器码，运行速度快，资源占用小；
  - 并发模型（goroutines 和 channels）使得编写高效的并发程序变得简单；
  - 工具链（如 go build, go test）非常易于使用，不需要额外的依赖管理工具；
- Rust：
  - 通过所有权模型来保证内存安全，无需垃圾收集；
  - 可以提供 C/C++ 相当的性能；
  - Rust 的包管理器和构建工具 Cargo 非常强大，易于管理依赖和构建项目。
- C/C++：
  - 提供了极高的性能和系统级的资源控制；
  - 广泛用于需要高性能的系统工具和应用程序；



Node.js 是开发各种开发者工具的热门选择，如代码生成器、构建工具、部署脚本等，一方面是因为 Node.js 的异步和非阻塞特性使其非常适合开发 I/O 密集型的应用，另一方面是因为可以与现有的 JS 或 Web 项目快速集成。

本项目是一个 Node.js 命令行工具的开发模版,其中使用到了两个前端或全栈开发中并不常见的库：yargs 和 Ink，因此简要介绍一下，如果要深入了解，可以移步官方文档。

## yargs

开发命令行工具的首要任务是正确的解析命令行参数，yargs 就是做这件事。

> Yargs helps you build interactive command line tools by parsing arguments and generating an elegant user interface.

当运行一个使用 yargs 的 Node.js 程序时，yargs 首先读取 `process.argv`，其中包含所有命令行输入参数的数组，yargs 负责解析这些参数，根据定义的规则（如命令、选项、别名等）来识别和分配这些参数。

同时，yargs 支持链式调用，它的每个方法，如 `.option()`, `.command()`, `.help()` 等，在执行完其配置或操作后，都会返回 yargs 对象本身。开发者可以继续在返回的对象上调用其他 yargs 方法，从而构建出完整的命令行参数解析逻辑。

## Ink

开发命令行工具的另一个重要任务是将信息输出到终端，Ink 就是做这件事的。

Ink 是一个用于构建命令行应用的 React 渲染库，它允许开发者使用 React 组件来构建命令行界面。同时，Ink 使用 [Yoga](https://github.com/facebook/yoga) 在终端中构建 Flexbox 布局，因此大多数类似 CSS 的 props 也可以在 Ink 中使用。

因此，前端开发者使用 Ink 几乎不需要再进行额外学习。





