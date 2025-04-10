import {S as e, E as o, a as t} from "./vendor.js";
function s(s, c) {
    let r;
    const n = [];
    s.querySelectorAll(".swiper-cubes-pagination .swiper").forEach(((s,c)=>{
        const l = new e(s,{
            modules: [o, t],
            effect: "cube",
            cubeEffect: {
                shadow: !1
            },
            createElements: !0,
            simulateTouch: !1,
            allowTouchMove: !1
        });
        s.addEventListener("click", (()=>{
            r.slideTo(c)
        }
        )),
        n.push(l)
    }
    ));
    const l = s.querySelector(".swiper-main");
    r = new e(l,{
        modules: [o, t],
        effect: c,
        createElements: !0,
        coverflowEffect: {
            depth: 200
        },
        on: {
            setTransition(e, o) {
                n.forEach((e=>{
                    e.setTransition(o)
                }
                ))
            },
            progress(e, o) {
                const t = 1 / 3 * 2;
                for (let s = 0; s < 4; s += 1) {
                    let e = (o + .3333333333333333 * (1 - s)) / t;
                    e = Math.max(Math.min(e, 1), 0),
                    n[s].setProgress(e)
                }
            }
        }
    })
}
s(document.querySelector(".swiper-all-cubes"), "cube"),
s(document.querySelector(".swiper-coverflow-cubes"), "coverflow");
