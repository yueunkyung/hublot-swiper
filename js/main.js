function addZero(num) {
    return num < 10 ? "0" + num : num;
}
loadClock("../data/bigbang.json");
$("#gnb .gnbList li").on("click", function () {
    const url = $(this).data("url");
    $(this).addClass("on").siblings("li").removeClass("on");
    loadClock(`../data/${url}.json`);
    return false;
});
function loadClock(_url) {
    $.ajax({
        url: _url,
        success: function (res) {
            // console.log("res", res);
            const clockList = [...res.clock];
            // console.log("clockList", clockList);
            let output = "";
            const total = clockList.length;
            $.each(clockList, function (i, item) {
                output += ` <li class="swiper-slide section" id="clock${addZero(i)}" data-splitting>
                                <div class="inner" data-swiper-parallax-scale="0.75">
                                    <div class="img"><img src ="${item.bg}"></div>
                                    <div class="info">
                                        <p class="category">${item.category}</p>
                                        <p class="title">
                                            ${item.title}
                                        </p>
                                        <p class="depth">
                                            ${item.depth}MM
                                        </p>
                                        <p class="price">
                                            CHF ${item.price}
                                        </p>
                                    </div>
                                </div>
                            </li>`;
            });
            $("#main .mask ul").html(output);
            Splitting();
            $("#indicator .num").text(`${addZero(1)}/${total}`);
            new Swiper("#main .mask", {
                direction: "vertical",
                slidesPerView: 1,
                speed: 1000,
                mousewheel: true,
                parallax: true,
                on: {
                    slideChangeTransitionStart: function () {
                        // console.log(this);
                        $("#indicator .num").text(`${addZero(this.activeIndex + 1)}/${total}`);
                        gsap.set(`.section:nth-child(${this.activeIndex + 1}) .char`, {
                            y: -200,
                            opacity: 0,
                        });
                    },
                    slideChangeTransitionEnd: function () {
                        // console.log(this);
                        gsap.to(`.section:nth-child(${this.activeIndex + 1}) .char`, {
                            y: 0,
                            opacity: 1,
                            duration: 1.5,
                            ease: "bounce",
                            stagger: {
                                amount: 0.1,
                                from: "random",
                            },
                        });
                    },
                },
            });
        },
    });
}

particlesJS.load("bg", "../data/particlesjs-config.json");
