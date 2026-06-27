import AnimatedText from "@/components/AnimatedText";

export default function LabsPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6">
      {/* Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/default.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-5" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatedText
          text="交互实验室"
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        />
        
        <p className="text-lg text-white/60 mb-16 leading-relaxed">
          React 交互组件与 DSP 可视化实验。探索前端技术的边界，
          <br className="hidden md:block" />
          在代码与视觉之间创造独特的体验。
        </p>

        <div className="grid gap-6">
          {[
            { title: "DSP 可视化", desc: "数字信号处理的交互式可视化工具", tag: "React + Canvas" },
            { title: "Framer Motion 实验", desc: "高级动画与手势交互组件库", tag: "Animation" },
            { title: "Glassmorphism UI Kit", desc: "玻璃拟态设计系统组件集合", tag: "Design System" },
          ].map((item, i) => (
            <div
              key={item.title}
              className="glass rounded-2xl p-6 hover:bg-white/[0.12] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-white group-hover:text-gradient transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                  {item.tag}
                </span>
              </div>
              <p className="text-white/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
