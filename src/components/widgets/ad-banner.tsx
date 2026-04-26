export function AdBanner() {
  return (
    <div className="w-full bg-muted/30 rounded-[2rem] p-8 md:p-10 flex items-center justify-center min-h-[220px] mb-12 relative overflow-hidden group hover:bg-muted/40 transition-colors duration-500 border border-transparent hover:border-border/40">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-teal-400 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="text-center space-y-4 relative z-10 max-w-sm">
        <span className="inline-block px-3 py-1 bg-background rounded-full text-[10px] uppercase tracking-widest text-muted-foreground font-bold shadow-sm">
          Sponsor
        </span>
        <h4 className="font-bold text-2xl md:text-3xl text-foreground !leading-tight">
          Supercharge Your Workflow
        </h4>
        <p className="text-sm md:text-base text-muted-foreground/90">
          Try our award-winning suite of tools today and output 10x faster.
        </p>
      </div>
    </div>
  );
}
