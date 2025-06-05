import { useEffect, useState } from 'react';

export function useVisibleSection(sectionIds: string[], threshold = 0.6) {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries.filter((entry) => entry.isIntersecting);

                if (visibleSections.length > 0) {
                    // Pick the top-most visible section
                    const sorted = visibleSections.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                    setActiveId(sorted[0].target.id);
                }
            },
            {
                threshold,
            }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds, threshold]);

    return activeId;
}