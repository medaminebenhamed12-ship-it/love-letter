document.addEventListener("DOMContentLoaded", () => {

    const questionScreen =
        document.getElementById("questionScreen");

    const giftScreen =
        document.getElementById("giftScreen");

    const surpriseScreen =
        document.getElementById("surpriseScreen");

    const loveScreen =
        document.getElementById("loveScreen");

    const letterScreen =
        document.getElementById("letterScreen");


    const yesBtn =
        document.getElementById("yesBtn");

    const noBtn =
        document.getElementById("noBtn");

    const giftBox =
        document.getElementById("giftBox");

    const continueBtn =
        document.getElementById("continueBtn");

    const loveContinue =
        document.getElementById("loveContinue");

    const music =
        document.getElementById("music");


    let noScale = 1;

    let yesScale = 1;


    /* -------------------------
       SCREEN FUNCTION
    ------------------------- */

    function showScreen(screen) {

        document
            .querySelectorAll(".screen")
            .forEach(s => {
                s.classList.remove("active");
            });

        screen.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* -------------------------
       FLOATING HEARTS
    ------------------------- */

    const heartsContainer =
        document.getElementById("floatingHearts");


    function makeHeart() {

        const heart =
            document.createElement("div");

        heart.className =
            "floating-heart";

        heart.textContent =
            Math.random() > .5
                ? "❤️"
                : "💗";

        heart.style.left =
            `${Math.random() * 100}%`;

        heart.style.fontSize =
            `${14 + Math.random() * 20}px`;

        heart.style.animationDuration =
            `${5 + Math.random() * 6}s`;

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 12000);
    }


    for (let i = 0; i < 10; i++) {

        setTimeout(
            makeHeart,
            i * 250
        );
    }


    setInterval(
        makeHeart,
        650
    );


    /* -------------------------
       NO BUTTON
    ------------------------- */

    noBtn.addEventListener(
        "click",
        () => {

            noScale =
                Math.max(
                    .25,
                    noScale - .13
                );

            yesScale += .13;


            noBtn.style.transform =
                `scale(${noScale})`;

            yesBtn.style.transform =
                `scale(${yesScale})`;
        }
    );


    /* -------------------------
       YES BUTTON
    ------------------------- */

    yesBtn.addEventListener(
        "click",
        () => {

            music
                .play()
                .catch(() => {});

            showScreen(
                giftScreen
            );
        }
    );


    /* -------------------------
       OPEN GIFT
    ------------------------- */

    function openGift() {

        if (
            giftBox.classList.contains("open")
        ) {
            return;
        }


        giftBox.classList.add("open");


        setTimeout(
            () => {

                showScreen(
                    surpriseScreen
                );

                createHeartBalloons();

            },
            900
        );
    }


    giftBox.addEventListener(
        "click",
        openGift
    );


    giftBox.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openGift();
            }
        }
    );


    /* -------------------------
       HEART BALLOONS
    ------------------------- */

    function createHeartBalloons() {

        const container =
            document.getElementById(
                "balloons"
            );

        const ring =
            document.getElementById(
                "ring"
            );

        const title =
            document.getElementById(
                "surpriseTitle"
            );


        container.innerHTML = "";

        ring.classList.remove(
            "show"
        );


        const colors = [
            "#ff4f9a",
            "#ff75b5",
            "#ff2f75",
            "#ff9ac5",
            "#e73883",
            "#ff5f9f"
        ];


        const total = 42;


        for (
            let i = 0;
            i < total;
            i++
        ) {

            const balloon =
                document.createElement(
                    "div"
                );

            balloon.className =
                "balloon";


            const t =
                (Math.PI * 2 * i)
                / total;


            /*
             * HEART FORMULA
             */

            const x =
                16 *
                Math.pow(
                    Math.sin(t),
                    3
                );


            const y =
                13 * Math.cos(t)
                - 5 * Math.cos(2 * t)
                - 2 * Math.cos(3 * t)
                - Math.cos(4 * t);


            const left =
                50 + x * 2.0;

            const top =
                50 - y * 2.0;


            balloon.style.left =
                `${left}%`;

            balloon.style.top =
                `${top}%`;


            balloon.style.background =
                colors[
                    i % colors.length
                ];


            container.appendChild(
                balloon
            );


            setTimeout(
                () => {

                    balloon.classList.add(
                        "show"
                    );

                },
                i * 65
            );
        }


        /*
         * SHOW RING
         */

        setTimeout(
            () => {

                ring.classList.add(
                    "show"
                );

                title.textContent =
                    "I choose you ❤️";

            },
            3500
        );
    }


    /* -------------------------
       SURPRISE -> LOVE
    ------------------------- */

    continueBtn.addEventListener(
        "click",
        () => {

            showScreen(
                loveScreen
            );
        }
    );


    /* -------------------------
       LOVE -> LETTER
    ------------------------- */

    loveContinue.addEventListener(
        "click",
        () => {

            showScreen(
                letterScreen
            );
        }
    );

});