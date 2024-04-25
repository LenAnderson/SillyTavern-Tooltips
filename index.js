const registerTooltips = ()=>{
    /**@type {HTMLElement[]} */
    const targets = Array.from(document.querySelectorAll('[title]:not(.template_element)')).filter(it=>!it.closest('.template_element'));
    for (const target of targets) {
        if (target.classList.contains('sttt--enabled')) {
            if (target.hasAttribute('title')) {
                target.setAttribute('sttt-title', target.title);
                target.removeAttribute('title');
            }
            continue;
        }
        target.classList.add('sttt--enabled');
        target.setAttribute('sttt--title', target.title);
        target.removeAttribute('title');
        let tt;
        target.addEventListener('pointerenter', (evt)=>{
            if (!tt) {
                tt = document.createElement('div'); {
                    tt.classList.add('sttt--tooltip');
                }
            }
            tt.textContent = target.getAttribute('sttt--title');
            tt.style.setProperty('--left', `${evt.clientX + 10}`);
            tt.style.setProperty('--top', `${evt.clientY + 15}`);
            tt.style.setProperty('--right', `${window.innerWidth - evt.clientX}`);
            tt.style.setProperty('--bottom', `${window.innerHeight - evt.clientY}`);
            tt.classList.remove('sttt--flip-h');
            tt.classList.remove('sttt--flip-v');
            tt.classList.remove('sttt--active');
            document.body.append(tt);
            const rect = tt.getBoundingClientRect();
            if (rect.right > window.innerWidth - 10) {
                tt.classList.add('sttt--flip-h');
            }
            if (rect.bottom > window.innerHeight - 10) {
                tt.classList.add('sttt--flip-v');
            }
            tt.classList.add('sttt--active');
        });
        target.addEventListener('pointerleave', ()=>{
            tt?.remove();
        });
    }
};

const init = ()=>{
    const mo = new MutationObserver(muts=>registerTooltips());
    mo.observe(document.body, { childList:true, subtree:true, attributes:true, attributeFilter:['title'] });
};
init();
