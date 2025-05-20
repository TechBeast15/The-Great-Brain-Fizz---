document.addEventListener("DOMContentLoaded", () => {
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }

  // Reset All Game Stage
  const ResetAllStageGameFunction =
    document.getElementById("ResetGameFunction");
  ResetAllStageGameFunction.addEventListener("click", () => {
    if (confirm("🎉 Want to reset the game? This will clear all progress.")) {
      localStorage.removeItem("unlockedStage");
      location.reload(); // Reloads to apply reset
    }
    console.log(ResetAllStageGameFunction); // ✅ Correct variable
  });

  // Music file (make sure the path is correct and the file exists)
  const backgroundMusic = new Audio("Assets/Audio/GamingTheme.mp3");
  backgroundMusic.loop = true;

  let isMusicPlaying = false;

  // Update the UI based on current state
  function updateMusicButtonUI(musicButton) {
    if (!musicButton) return;

    musicButton.classList.toggle("colorBtn", isMusicPlaying);

    const icon = musicButton.querySelector("i");
    if (icon) {
      icon.className = isMusicPlaying ? "bi bi-volume-up" : "bi bi-volume-mute";
    }
  }

  // Music toggle function
  const musicButton = document.getElementById("musicToggleBtn");

  if (musicButton) {
    musicButton.addEventListener("click", () => {
      if (isMusicPlaying) {
        backgroundMusic.pause();
      } else {
        backgroundMusic.play().catch((err) => {
          console.warn("Autoplay blocked:", err);
        });
      }

      isMusicPlaying = !isMusicPlaying;
      updateMusicButtonUI(musicButton);
    });
  }

  // SOUND FUNCTIONS
  const pickSound = new Audio("Assets/Audio/pick.mp3");
  const dropSound = new Audio("Assets/Audio/drop.mp3");
  const levelComplete = new Audio("Assets/Audio/levelComplete.mp3");
  pickSound.currentTime = 1;

  let isSoundEnabled = true; // Flag to keep track of sound status

  // Sound toggle function
  const soundButton = document.getElementById("soundToggleBtn");
  // Sound Toggle Function
  if (soundButton) {
    soundButton.addEventListener("click", () => {
      isSoundEnabled = !isSoundEnabled;
      soundButton.classList.toggle("colorBtn", isSoundEnabled);

      const icon = soundButton.querySelector("i");
      console.log(icon);
      if (icon) {
        icon.className = isSoundEnabled
          ? "bi bi-volume-up"
          : "bi bi-volume-mute";
      }
    });
  }

  // Helper function to play sound if enabled
  function playSound(sound) {
    if (isSoundEnabled) {
      sound.cloneNode().play();
    }
  }

  // STAGE GENERATE FUNCTION :
  const totalStages = 59;
  const container = document.getElementById("stagesContainer");

  for (let i = 1; i <= totalStages; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-number-access", i);

    card.innerHTML = `
      <img src="" alt="Stage ${i}" />
      <div class="card-body">
        <h3>Stage - ${i}</h3>
      </div>
    `;

    container.appendChild(card);
  }

  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    const fullUI = document.getElementById("fullUI");
    const loadingText = document.getElementById("loadingText");

    // Create the Enter button (initially hidden)
    const enterButton = document.createElement("button");
    enterButton.id = "enterButton";
    enterButton.textContent = "Play";
    enterButton.style.display = "none"; // Hide initially
    preloader.appendChild(enterButton);

    // Show the Play button after a short delay and remove Loading text
    setTimeout(() => {
      loadingText.style.display = "none";
      enterButton.style.display = "inline-block";
    }, 1000); // Adjust delay if needed

    let hasEntered = false;

    enterButton.addEventListener("click", function () {
      if (hasEntered) return;
      hasEntered = true;
      enterButton.disabled = true;
      enterButton.style.pointerEvents = "none";

      preloader.classList.add("fade-out");
      fullUI.style.display = "block";

      setTimeout(() => {
        preloader.style.display = "none";
        fullUI.classList.add("fade-in");

        backgroundMusic
          .play()
          .then(() => {
            isMusicPlaying = true;
            const musicButton = document.querySelector(".musicButton");
            updateMusicButtonUI(musicButton);
          })
          .catch((err) => {
            console.warn("Autoplay blocked:", err);
            isMusicPlaying = false;
          });

        isSoundEnabled = true;
      }, 1000);
    });

    // Arrow icon adjustment based on window size
    const arrowIcon = document.getElementById("arrow");

    if (arrowIcon) {
      if (window.innerWidth < 576) {
        arrowIcon.classList.add("bi-arrow-90deg-right");
      } else {
        arrowIcon.classList.add("bi-arrow-90deg-down");
      }
    }
    const WHOSESTAGE = document.getElementById("WHOSESTAGE");
    const EmptyBoxHeading = document.querySelector(".EmptyBoxHeading");
    //
    if (window.innerWidth < 325) {
      WHOSESTAGE.classList.add("WHOSESTAGESize");
      EmptyBoxHeading.classList.add("EmptyBoxHeadingSize");
    } else {
      WHOSESTAGE.classList.remove("WHOSESTAGESize");
      EmptyBoxHeading.classList.remove("EmptyBoxHeadingSize");
    }
  });

  const EmptyBoxHeading = document.querySelector(".EmptyBoxHeading");
  const WHOSESTAGE = document.getElementById("WHOSESTAGE");
  // Adjust arrow icon on window resize
  window.addEventListener("resize", () => {
    const arrowIcon = document.getElementById("arrow");
    if (window.innerWidth < 576) {
      arrowIcon.classList.add("bi-arrow-90deg-right");
      arrowIcon.classList.remove("bi-arrow-90deg-down");
    } else {
      arrowIcon.classList.add("bi-arrow-90deg-down");
      arrowIcon.classList.remove("bi-arrow-90deg-right");
    }

    if (window.innerWidth < 325) {
      WHOSESTAGE.classList.add("WHOSESTAGESize");
      EmptyBoxHeading.classList.add("EmptyBoxHeadingSize");
    } else {
      WHOSESTAGE.classList.remove("WHOSESTAGESize");
      EmptyBoxHeading.classList.remove("EmptyBoxHeadingSize");
    }
  });

  const stagesCard = document.querySelector(".stagesCard");
  let horizontalScroll = 0;
  let verticalScroll = 0;

  function scrollFunction(xPosition) {
    if (!stagesCard) return;

    if (window.innerWidth > 576) {
      const maxScrollLeft = stagesCard.scrollWidth - stagesCard.clientWidth;
      horizontalScroll = Math.min(
        Math.max(horizontalScroll + xPosition, 0),
        maxScrollLeft
      );

      stagesCard.scrollTo({
        left: horizontalScroll,
        behavior: "smooth",
      });
    } else {
      const maxScrollTop = stagesCard.scrollHeight - stagesCard.clientHeight;
      verticalScroll = Math.min(
        Math.max(verticalScroll + xPosition, 0),
        maxScrollTop
      );

      stagesCard.scrollTo({
        top: verticalScroll,
        behavior: "smooth",
      });

      //
    }
  }

  const scrollLeftBtn = document.querySelector(".scroll-left");
  const scrollRightBtn = document.querySelector(".scroll-right");

  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener("click", () => scrollFunction(-200));
  }
  if (scrollRightBtn) {
    scrollRightBtn.addEventListener("click", () => scrollFunction(200));
  }

  // Puzzle Game Class

  class PuzzleGame {
    constructor(stages) {
      this.stages = stages;
      this.stageContainer = document.querySelector(".STAGE");
      this.mainPage = document.querySelector(".mainPage");
      this.stageLabel = document.querySelector("#WHOSESTAGE");
      this.puzzleContainer = document.querySelector(".PUZZLEDIV");
      this.DORPIMG = document.querySelector(".DORPIMG");
      this.playNotice = document.querySelector(".playNotice");
      this.stINQ = document.querySelector("#stINQ");
      this.currentStage = 0;
      this.fullImageHere = document.querySelectorAll(".fullImageHere");
      this.initUnlockedStages();
    }

    shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    initUnlockedStages() {
      const savedStage =
        parseInt(localStorage.getItem("unlockedStage"), 10) || 1;
      document.querySelectorAll(".card").forEach((btn) => {
        const stage = parseInt(btn.dataset.numberAccess, 10);
        if (stage <= savedStage) {
          btn.classList.add("open");
        }
      });
    }

    // Function to load the selected stage
    loadStage(button) {
      if (!button.classList.contains("open")) {
        alert("🔒 Stage is locked.");
        return;
      }

      const stageNumber = parseInt(button.dataset.numberAccess, 10);
      if (
        isNaN(stageNumber) ||
        stageNumber < 1 ||
        stageNumber > this.stages.length
      ) {
        alert("Invalid stage.");
        return;
      }

      this.currentStage = stageNumber;
      this.stageContainer.style.backgroundImage = `url(${
        StageBGImages[stageNumber - 1]
      })`;

      // Update full image preview for the selected stage
      this.fullImageHere.forEach((img) => {
        img.src = FullImages[stageNumber - 1];
      });

      const stageImages = this.stages[stageNumber - 1];

      this.stageLabel.textContent = `STAGES - ${stageNumber}`;

      // Hide the main page and show the stage container with the play notice
      this.mainPage.classList.add("fade-out");
      this.playNotice.style.display = "flex"; // Show play notice
      this.stINQ.textContent = `STAGE - ${stageNumber}`;
      setTimeout(() => {
        this.mainPage.style.display = "none";
        this.stageContainer.style.display = "block";
        // Start loading the puzzle images, then enable play button when done
        this.renderPuzzle(stageImages);
      }, 500);
    }

    // Method to render the puzzle pieces based on the given images
    renderPuzzle(images) {
      this.puzzleContainer.innerHTML = ""; // Clear existing puzzle
      this.DORPIMG.innerHTML = "";

      const entries = this.shuffle(Object.entries(images));
      const length = entries.length;
      const size = Math.sqrt(length);
      const percent = 100 / size;

      let loadedImagesCount = 0; // Track the number of loaded images

      // Create puzzle pieces (divs with images)
      for (let [key, value] of entries) {
        const box = document.createElement("div");
        const img = document.createElement("img");

        box.className = "boxImg";
        img.className = "puzzleImage";
        img.id = `img${key}`;
        img.src = `./Assets/Img/${value}`;
        img.setAttribute("draggable", true);

        box.appendChild(img);
        box.style.width = percent + "%";
        box.style.height = percent + "%";
        this.puzzleContainer.appendChild(box);

        // Check when the image has fully loaded
        img.onload = () => {
          loadedImagesCount++;
          // Once all images are loaded, enable the play button
          if (loadedImagesCount === entries.length) {
            this.enablePlayButton(); // Enable play button when all images are loaded
          }
        };
      }

      this.enableDragDrop(); // Enable drag-and-drop functionality (but not until images are fully loaded)
    }

    // Enable the play button after all images are loaded
    enablePlayButton() {
      const playButton = this.playNotice.querySelector(".play-button");
      playButton.disabled = false; // Enable the play button
      playButton.addEventListener("click", () => {
        this.startStage(); // Start the game when play button is clicked
      });
    }

    startStage() {
      if (!this.currentStage) return;

      this.stageContainer.style.display = "block";
      this.playNotice.style.display = "none";
      this.renderPuzzle(this.stages[this.currentStage - 1]); // Ensure puzzle is rendered
    }

    enableDragDrop() {
      const images = document.querySelectorAll(".puzzleImage");
      const boxes = document.querySelectorAll(".boxImg");

      // --- DESKTOP SUPPORT ---
      images.forEach((img) => {
        img.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", img.id);
          img.style.opacity = "0.4";
          playSound(pickSound);
        });

        img.addEventListener("dragend", () => {
          img.style.opacity = "1";
        });
      });

      boxes.forEach((box) => {
        box.addEventListener("dragover", (e) => {
          if (box.children.length === 0) {
            e.preventDefault();
          }
        });

        box.addEventListener("drop", (e) => {
          e.preventDefault();
          const id = e.dataTransfer.getData("text/plain");
          const draggedImg = document.getElementById(id);

          if (draggedImg && box.children.length === 0) {
            box.appendChild(draggedImg);
            this.checkSequence();
            playSound(dropSound);
          }
        });
      });

      // --- MOBILE TOUCH SUPPORT WITH VISUAL DRAGGING ---
      let touchImg = null;
      let floatingImg = null;

      images.forEach((img) => {
        img.addEventListener("touchstart", (e) => {
          e.preventDefault();
          img.style.opacity = "0.4";
          touchImg = img;

          // Clone image for visual feedback
          floatingImg = img.cloneNode(true);
          floatingImg.style.position = "fixed";
          floatingImg.style.pointerEvents = "none";
          floatingImg.style.opacity = "0.7";
          floatingImg.style.zIndex = "9999";
          floatingImg.classList.add("floating-drag-img");

          document.body.appendChild(floatingImg);

          const touch = e.touches[0];
          floatingImg.style.left = touch.clientX + "px";
          floatingImg.style.top = touch.clientY + "px";

          playSound(pickSound);
        });
      });

      boxes.forEach((box) => {
        box.addEventListener("touchmove", (e) => {
          if (!touchImg || !floatingImg) return;

          const touch = e.touches[0];
          floatingImg.style.left = touch.clientX + "px";
          floatingImg.style.top = touch.clientY + "px";

          const el = document.elementFromPoint(touch.clientX, touch.clientY);
          boxes.forEach((b) => b.classList.remove("highlight-drop"));
          if (
            el &&
            el.classList.contains("boxImg") &&
            el.children.length === 0
          ) {
            el.classList.add("highlight-drop");
          }

          e.preventDefault(); // Prevent scroll
        });

        box.addEventListener("touchend", (e) => {
          if (!touchImg || !floatingImg) return;

          const touch = e.changedTouches[0];
          const dropTarget = document.elementFromPoint(
            touch.clientX,
            touch.clientY
          );

          // ✅ Always reset opacity
          touchImg.style.opacity = "1";

          if (
            dropTarget &&
            dropTarget.classList.contains("boxImg") &&
            dropTarget.children.length === 0
          ) {
            touchImg.style.opacity = "1";
            dropTarget.appendChild(touchImg);
            this.checkSequence();
            playSound(dropSound);
          }

          boxes.forEach((b) => b.classList.remove("highlight-drop"));

          document.body.removeChild(floatingImg);
          floatingImg = null;
          touchImg = null;
        });
      });

      // Cleanup on global touchend (in case of drop outside box)
      document.addEventListener("touchend", () => {
        if (floatingImg) {
          document.body.removeChild(floatingImg);
          floatingImg = null;
        }
        touchImg = null;
        boxes.forEach((b) => b.classList.remove("highlight-drop"));
      });
    }

    checkSequence() {
      const boxes = document.querySelectorAll(".boxImg");
      const stageImages = this.stages[this.currentStage - 1];

      let currentOrder = "";
      let correctOrder = "";

      for (let key in stageImages) {
        correctOrder += stageImages[key];
      }

      boxes.forEach((box, index) => {
        if (index === 0) return; // Skip the first box
        const img = box.querySelector("img");
        if (img) {
          const filename = img.src.split("/Img/")[1];
          currentOrder += filename;
        }
      });

      if (currentOrder === correctOrder) {
        playSound(levelComplete);

        setTimeout(() => {
          alert("🎉 Stage Complete!");

          const nextStage = this.currentStage + 1;
          const buttons = document.querySelectorAll(".card");

          if (buttons[nextStage - 1]) {
            buttons[nextStage - 1].classList.add("open");
            localStorage.setItem("unlockedStage", nextStage);

            nextStageOpen();
          } else {
            // All stages are complete
            console.log("All stages completed!");
            alert("🎉 All stages completed!");
          }
        }, 2000);
      }
    }

    exitStage() {
      this.mainPage.classList.remove("fade-out");
      this.stageContainer.style.display = "none";
      this.playNotice.style.display = "none";
      this.mainPage.style.display = "flex";
      this.puzzleContainer.innerHTML = "";
      this.currentStage = 0;
    }
  }
  // Stage Data

  const STAGES = [
    // STAGE : 1 - (3X3)
    {
      1: "Stages/PuzzleSet1/imageonline/1.png",
      2: "Stages/PuzzleSet1/imageonline/2.png",
      3: "Stages/PuzzleSet1/imageonline/3.png",
      4: "Stages/PuzzleSet1/imageonline/4.png",
      5: "Stages/PuzzleSet1/imageonline/5.png",
      6: "Stages/PuzzleSet1/imageonline/6.png",
      7: "Stages/PuzzleSet1/imageonline/7.png",
      8: "Stages/PuzzleSet1/imageonline/8.png",
      9: "Stages/PuzzleSet1/imageonline/9.png",
    },
    // STAGE : 2 - (3X3)
    {
      1: "Stages/PuzzleSet2/imageonline/1.png",
      2: "Stages/PuzzleSet2/imageonline/2.png",
      3: "Stages/PuzzleSet2/imageonline/3.png",
      4: "Stages/PuzzleSet2/imageonline/4.png",
      5: "Stages/PuzzleSet2/imageonline/5.png",
      6: "Stages/PuzzleSet2/imageonline/6.png",
      7: "Stages/PuzzleSet2/imageonline/7.png",
      8: "Stages/PuzzleSet2/imageonline/8.png",
      9: "Stages/PuzzleSet2/imageonline/9.png",
    },
    // STAGE : 3 - (3X3)
    {
      1: "Stages/PuzzleSet3/imageonline/1.png",
      2: "Stages/PuzzleSet3/imageonline/2.png",
      3: "Stages/PuzzleSet3/imageonline/3.png",
      4: "Stages/PuzzleSet3/imageonline/4.png",
      5: "Stages/PuzzleSet3/imageonline/5.png",
      6: "Stages/PuzzleSet3/imageonline/6.png",
      7: "Stages/PuzzleSet3/imageonline/7.png",
      8: "Stages/PuzzleSet3/imageonline/8.png",
      9: "Stages/PuzzleSet3/imageonline/9.png",
    },
    // STAGE : 4 - (4X4)
    {
      1: "Stages/PuzzleSet4/imageonline/1.png",
      2: "Stages/PuzzleSet4/imageonline/2.png",
      3: "Stages/PuzzleSet4/imageonline/3.png",
      4: "Stages/PuzzleSet4/imageonline/4.png",
      5: "Stages/PuzzleSet4/imageonline/5.png",
      6: "Stages/PuzzleSet4/imageonline/6.png",
      7: "Stages/PuzzleSet4/imageonline/7.png",
      8: "Stages/PuzzleSet4/imageonline/8.png",
      9: "Stages/PuzzleSet4/imageonline/9.png",
      10: "Stages/PuzzleSet4/imageonline/10.png",
      11: "Stages/PuzzleSet4/imageonline/11.png",
      12: "Stages/PuzzleSet4/imageonline/12.png",
      13: "Stages/PuzzleSet4/imageonline/13.png",
      14: "Stages/PuzzleSet4/imageonline/14.png",
      15: "Stages/PuzzleSet4/imageonline/15.png",
      16: "Stages/PuzzleSet4/imageonline/16.png",
    },
    // STAGE : 5 - (4X4)
    {
      1: "Stages/PuzzleSet5/imageonline/1.png",
      2: "Stages/PuzzleSet5/imageonline/2.png",
      3: "Stages/PuzzleSet5/imageonline/3.png",
      4: "Stages/PuzzleSet5/imageonline/4.png",
      5: "Stages/PuzzleSet5/imageonline/5.png",
      6: "Stages/PuzzleSet5/imageonline/6.png",
      7: "Stages/PuzzleSet5/imageonline/7.png",
      8: "Stages/PuzzleSet5/imageonline/8.png",
      9: "Stages/PuzzleSet5/imageonline/9.png",
      10: "Stages/PuzzleSet5/imageonline/10.png",
      11: "Stages/PuzzleSet5/imageonline/11.png",
      12: "Stages/PuzzleSet5/imageonline/12.png",
      13: "Stages/PuzzleSet5/imageonline/13.png",
      14: "Stages/PuzzleSet5/imageonline/14.png",
      15: "Stages/PuzzleSet5/imageonline/15.png",
      16: "Stages/PuzzleSet5/imageonline/16.png",
    },
    // STAGE : 6- (4X4)
    {
      1: "Stages/PuzzleSet6/imageonline/1.jpeg",
      2: "Stages/PuzzleSet6/imageonline/2.jpeg",
      3: "Stages/PuzzleSet6/imageonline/3.jpeg",
      4: "Stages/PuzzleSet6/imageonline/4.jpeg",
      5: "Stages/PuzzleSet6/imageonline/5.jpeg",
      6: "Stages/PuzzleSet6/imageonline/6.jpeg",
      7: "Stages/PuzzleSet6/imageonline/7.jpeg",
      8: "Stages/PuzzleSet6/imageonline/8.jpeg",
      9: "Stages/PuzzleSet6/imageonline/9.jpeg",
      10: "Stages/PuzzleSet6/imageonline/10.jpeg",
      11: "Stages/PuzzleSet6/imageonline/11.jpeg",
      12: "Stages/PuzzleSet6/imageonline/12.jpeg",
      13: "Stages/PuzzleSet6/imageonline/13.jpeg",
      14: "Stages/PuzzleSet6/imageonline/14.jpeg",
      15: "Stages/PuzzleSet6/imageonline/15.jpeg",
      16: "Stages/PuzzleSet6/imageonline/16.jpeg",
    },
    // STAGE : 7- (4X4)
    {
      1: "Stages/PuzzleSet7/imageonline/1.jpeg",
      2: "Stages/PuzzleSet7/imageonline/2.jpeg",
      3: "Stages/PuzzleSet7/imageonline/3.jpeg",
      4: "Stages/PuzzleSet7/imageonline/4.jpeg",
      5: "Stages/PuzzleSet7/imageonline/5.jpeg",
      6: "Stages/PuzzleSet7/imageonline/6.jpeg",
      7: "Stages/PuzzleSet7/imageonline/7.jpeg",
      8: "Stages/PuzzleSet7/imageonline/8.jpeg",
      9: "Stages/PuzzleSet7/imageonline/9.jpeg",
      10: "Stages/PuzzleSet7/imageonline/10.jpeg",
      11: "Stages/PuzzleSet7/imageonline/11.jpeg",
      12: "Stages/PuzzleSet7/imageonline/12.jpeg",
      13: "Stages/PuzzleSet7/imageonline/13.jpeg",
      14: "Stages/PuzzleSet7/imageonline/14.jpeg",
      15: "Stages/PuzzleSet7/imageonline/15.jpeg",
      16: "Stages/PuzzleSet7/imageonline/16.jpeg",
    },
    // STAGE : 8- (5X5)
    {
      1: "Stages/PuzzleSet8/imageonline/1.jpeg",
      2: "Stages/PuzzleSet8/imageonline/2.jpeg",
      3: "Stages/PuzzleSet8/imageonline/3.jpeg",
      4: "Stages/PuzzleSet8/imageonline/4.jpeg",
      5: "Stages/PuzzleSet8/imageonline/5.jpeg",
      6: "Stages/PuzzleSet8/imageonline/6.jpeg",
      7: "Stages/PuzzleSet8/imageonline/7.jpeg",
      8: "Stages/PuzzleSet8/imageonline/8.jpeg",
      9: "Stages/PuzzleSet8/imageonline/9.jpeg",
      10: "Stages/PuzzleSet8/imageonline/10.jpeg",
      11: "Stages/PuzzleSet8/imageonline/11.jpeg",
      12: "Stages/PuzzleSet8/imageonline/12.jpeg",
      13: "Stages/PuzzleSet8/imageonline/13.jpeg",
      14: "Stages/PuzzleSet8/imageonline/14.jpeg",
      15: "Stages/PuzzleSet8/imageonline/15.jpeg",
      16: "Stages/PuzzleSet8/imageonline/16.jpeg",
      17: "Stages/PuzzleSet8/imageonline/17.jpeg",
      18: "Stages/PuzzleSet8/imageonline/18.jpeg",
      19: "Stages/PuzzleSet8/imageonline/19.jpeg",
      20: "Stages/PuzzleSet8/imageonline/20.jpeg",
      21: "Stages/PuzzleSet8/imageonline/21.jpeg",
      22: "Stages/PuzzleSet8/imageonline/22.jpeg",
      23: "Stages/PuzzleSet8/imageonline/23.jpeg",
      24: "Stages/PuzzleSet8/imageonline/24.jpeg",
      25: "Stages/PuzzleSet8/imageonline/25.jpeg",
    },
    // STAGE : 9- (5X5)
    {
      1: "Stages/PuzzleSet9/imageonline/1.jpeg",
      2: "Stages/PuzzleSet9/imageonline/2.jpeg",
      3: "Stages/PuzzleSet9/imageonline/3.jpeg",
      4: "Stages/PuzzleSet9/imageonline/4.jpeg",
      5: "Stages/PuzzleSet9/imageonline/5.jpeg",
      6: "Stages/PuzzleSet9/imageonline/6.jpeg",
      7: "Stages/PuzzleSet9/imageonline/7.jpeg",
      8: "Stages/PuzzleSet9/imageonline/8.jpeg",
      9: "Stages/PuzzleSet9/imageonline/9.jpeg",
      10: "Stages/PuzzleSet9/imageonline/10.jpeg",
      11: "Stages/PuzzleSet9/imageonline/11.jpeg",
      12: "Stages/PuzzleSet9/imageonline/12.jpeg",
      13: "Stages/PuzzleSet9/imageonline/13.jpeg",
      14: "Stages/PuzzleSet9/imageonline/14.jpeg",
      15: "Stages/PuzzleSet9/imageonline/15.jpeg",
      16: "Stages/PuzzleSet9/imageonline/16.jpeg",
      17: "Stages/PuzzleSet9/imageonline/17.jpeg",
      18: "Stages/PuzzleSet9/imageonline/18.jpeg",
      19: "Stages/PuzzleSet9/imageonline/19.jpeg",
      20: "Stages/PuzzleSet9/imageonline/20.jpeg",
      21: "Stages/PuzzleSet9/imageonline/21.jpeg",
      22: "Stages/PuzzleSet9/imageonline/22.jpeg",
      23: "Stages/PuzzleSet9/imageonline/23.jpeg",
      24: "Stages/PuzzleSet9/imageonline/24.jpeg",
      25: "Stages/PuzzleSet9/imageonline/25.jpeg",
    },
    // STAGE : 10- (5X5)
    {
      1: "Stages/PuzzleSet10/imageonline/1.jpeg",
      2: "Stages/PuzzleSet10/imageonline/2.jpeg",
      3: "Stages/PuzzleSet10/imageonline/3.jpeg",
      4: "Stages/PuzzleSet10/imageonline/4.jpeg",
      5: "Stages/PuzzleSet10/imageonline/5.jpeg",
      6: "Stages/PuzzleSet10/imageonline/6.jpeg",
      7: "Stages/PuzzleSet10/imageonline/7.jpeg",
      8: "Stages/PuzzleSet10/imageonline/8.jpeg",
      9: "Stages/PuzzleSet10/imageonline/9.jpeg",

      10: "Stages/PuzzleSet10/imageonline/10.jpeg",
      11: "Stages/PuzzleSet10/imageonline/11.jpeg",
      12: "Stages/PuzzleSet10/imageonline/12.jpeg",
      13: "Stages/PuzzleSet10/imageonline/13.jpeg",
      14: "Stages/PuzzleSet10/imageonline/14.jpeg",
      15: "Stages/PuzzleSet10/imageonline/15.jpeg",
      16: "Stages/PuzzleSet10/imageonline/16.jpeg",
      17: "Stages/PuzzleSet10/imageonline/17.jpeg",
      18: "Stages/PuzzleSet10/imageonline/18.jpeg",
      19: "Stages/PuzzleSet10/imageonline/19.jpeg",
      20: "Stages/PuzzleSet10/imageonline/20.jpeg",
      21: "Stages/PuzzleSet10/imageonline/21.jpeg",
      22: "Stages/PuzzleSet10/imageonline/22.jpeg",
      23: "Stages/PuzzleSet10/imageonline/23.jpeg",
      24: "Stages/PuzzleSet10/imageonline/24.jpeg",
      25: "Stages/PuzzleSet10/imageonline/25.jpeg",
    },
    // STAGE : 11- (5X5)
    {
      1: "Stages/PuzzleSet11/imageonline/1.jpeg",
      2: "Stages/PuzzleSet11/imageonline/2.jpeg",
      3: "Stages/PuzzleSet11/imageonline/3.jpeg",
      4: "Stages/PuzzleSet11/imageonline/4.jpeg",
      5: "Stages/PuzzleSet11/imageonline/5.jpeg",
      6: "Stages/PuzzleSet11/imageonline/6.jpeg",
      7: "Stages/PuzzleSet11/imageonline/7.jpeg",
      8: "Stages/PuzzleSet11/imageonline/8.jpeg",
      9: "Stages/PuzzleSet11/imageonline/9.jpeg",

      10: "Stages/PuzzleSet11/imageonline/10.jpeg",
      11: "Stages/PuzzleSet11/imageonline/11.jpeg",
      12: "Stages/PuzzleSet11/imageonline/12.jpeg",
      13: "Stages/PuzzleSet11/imageonline/13.jpeg",
      14: "Stages/PuzzleSet11/imageonline/14.jpeg",
      15: "Stages/PuzzleSet11/imageonline/15.jpeg",
      16: "Stages/PuzzleSet11/imageonline/16.jpeg",
      17: "Stages/PuzzleSet11/imageonline/17.jpeg",
      18: "Stages/PuzzleSet11/imageonline/18.jpeg",
      19: "Stages/PuzzleSet11/imageonline/19.jpeg",
      20: "Stages/PuzzleSet11/imageonline/20.jpeg",
      21: "Stages/PuzzleSet11/imageonline/21.jpeg",
      22: "Stages/PuzzleSet11/imageonline/22.jpeg",
      23: "Stages/PuzzleSet11/imageonline/23.jpeg",
      24: "Stages/PuzzleSet11/imageonline/24.jpeg",
      25: "Stages/PuzzleSet11/imageonline/25.jpeg",
    },
    // STAGE : 12- (5X5)
    {
      1: "Stages/PuzzleSet12/imageonline/1.jpeg",
      2: "Stages/PuzzleSet12/imageonline/2.jpeg",
      3: "Stages/PuzzleSet12/imageonline/3.jpeg",
      4: "Stages/PuzzleSet12/imageonline/4.jpeg",
      5: "Stages/PuzzleSet12/imageonline/5.jpeg",
      6: "Stages/PuzzleSet12/imageonline/6.jpeg",
      7: "Stages/PuzzleSet12/imageonline/7.jpeg",
      8: "Stages/PuzzleSet12/imageonline/8.jpeg",
      9: "Stages/PuzzleSet12/imageonline/9.jpeg",

      10: "Stages/PuzzleSet12/imageonline/10.jpeg",
      11: "Stages/PuzzleSet12/imageonline/11.jpeg",
      12: "Stages/PuzzleSet12/imageonline/12.jpeg",
      13: "Stages/PuzzleSet12/imageonline/13.jpeg",
      14: "Stages/PuzzleSet12/imageonline/14.jpeg",
      15: "Stages/PuzzleSet12/imageonline/15.jpeg",
      16: "Stages/PuzzleSet12/imageonline/16.jpeg",
      17: "Stages/PuzzleSet12/imageonline/17.jpeg",
      18: "Stages/PuzzleSet12/imageonline/18.jpeg",
      19: "Stages/PuzzleSet12/imageonline/19.jpeg",
      20: "Stages/PuzzleSet12/imageonline/20.jpeg",
      21: "Stages/PuzzleSet12/imageonline/21.jpeg",
      22: "Stages/PuzzleSet12/imageonline/22.jpeg",
      23: "Stages/PuzzleSet12/imageonline/23.jpeg",
      24: "Stages/PuzzleSet12/imageonline/24.jpeg",
      25: "Stages/PuzzleSet12/imageonline/25.jpeg",
    },
    // STAGE : 13- (6X6)
    {
      1: "Stages/PuzzleSet13/imageonline/1.jpeg",
      2: "Stages/PuzzleSet13/imageonline/2.jpeg",
      3: "Stages/PuzzleSet13/imageonline/3.jpeg",
      4: "Stages/PuzzleSet13/imageonline/4.jpeg",
      5: "Stages/PuzzleSet13/imageonline/5.jpeg",
      6: "Stages/PuzzleSet13/imageonline/6.jpeg",
      7: "Stages/PuzzleSet13/imageonline/7.jpeg",
      8: "Stages/PuzzleSet13/imageonline/8.jpeg",
      9: "Stages/PuzzleSet13/imageonline/9.jpeg",

      10: "Stages/PuzzleSet13/imageonline/10.jpeg",
      11: "Stages/PuzzleSet13/imageonline/11.jpeg",
      12: "Stages/PuzzleSet13/imageonline/12.jpeg",
      13: "Stages/PuzzleSet13/imageonline/13.jpeg",
      14: "Stages/PuzzleSet13/imageonline/14.jpeg",
      15: "Stages/PuzzleSet13/imageonline/15.jpeg",
      16: "Stages/PuzzleSet13/imageonline/16.jpeg",

      17: "Stages/PuzzleSet13/imageonline/17.jpeg",
      18: "Stages/PuzzleSet13/imageonline/18.jpeg",
      19: "Stages/PuzzleSet13/imageonline/19.jpeg",
      20: "Stages/PuzzleSet13/imageonline/20.jpeg",
      21: "Stages/PuzzleSet13/imageonline/21.jpeg",
      22: "Stages/PuzzleSet13/imageonline/22.jpeg",
      23: "Stages/PuzzleSet13/imageonline/23.jpeg",
      24: "Stages/PuzzleSet13/imageonline/24.jpeg",
      25: "Stages/PuzzleSet13/imageonline/25.jpeg",

      26: "Stages/PuzzleSet13/imageonline/26.jpeg",
      27: "Stages/PuzzleSet13/imageonline/27.jpeg",
      28: "Stages/PuzzleSet13/imageonline/28.jpeg",
      29: "Stages/PuzzleSet13/imageonline/29.jpeg",
      30: "Stages/PuzzleSet13/imageonline/30.jpeg",
      31: "Stages/PuzzleSet13/imageonline/31.jpeg",
      32: "Stages/PuzzleSet13/imageonline/32.jpeg",
      33: "Stages/PuzzleSet13/imageonline/33.jpeg",
      34: "Stages/PuzzleSet13/imageonline/34.jpeg",
      35: "Stages/PuzzleSet13/imageonline/35.jpeg",
      36: "Stages/PuzzleSet13/imageonline/36.jpeg",
    },
    // STAGE : 14- (6X6)
    {
      1: "Stages/PuzzleSet14/imageonline/1.jpeg",
      2: "Stages/PuzzleSet14/imageonline/2.jpeg",
      3: "Stages/PuzzleSet14/imageonline/3.jpeg",
      4: "Stages/PuzzleSet14/imageonline/4.jpeg",
      5: "Stages/PuzzleSet14/imageonline/5.jpeg",
      6: "Stages/PuzzleSet14/imageonline/6.jpeg",
      7: "Stages/PuzzleSet14/imageonline/7.jpeg",
      8: "Stages/PuzzleSet14/imageonline/8.jpeg",
      9: "Stages/PuzzleSet14/imageonline/9.jpeg",

      10: "Stages/PuzzleSet14/imageonline/10.jpeg",
      11: "Stages/PuzzleSet14/imageonline/11.jpeg",
      12: "Stages/PuzzleSet14/imageonline/12.jpeg",
      13: "Stages/PuzzleSet14/imageonline/13.jpeg",
      14: "Stages/PuzzleSet14/imageonline/14.jpeg",
      15: "Stages/PuzzleSet14/imageonline/15.jpeg",
      16: "Stages/PuzzleSet14/imageonline/16.jpeg",

      17: "Stages/PuzzleSet14/imageonline/17.jpeg",
      18: "Stages/PuzzleSet14/imageonline/18.jpeg",
      19: "Stages/PuzzleSet14/imageonline/19.jpeg",
      20: "Stages/PuzzleSet14/imageonline/20.jpeg",
      21: "Stages/PuzzleSet14/imageonline/21.jpeg",
      22: "Stages/PuzzleSet14/imageonline/22.jpeg",
      23: "Stages/PuzzleSet14/imageonline/23.jpeg",
      24: "Stages/PuzzleSet14/imageonline/24.jpeg",
      25: "Stages/PuzzleSet14/imageonline/25.jpeg",

      26: "Stages/PuzzleSet14/imageonline/26.jpeg",
      27: "Stages/PuzzleSet14/imageonline/27.jpeg",
      28: "Stages/PuzzleSet14/imageonline/28.jpeg",
      29: "Stages/PuzzleSet14/imageonline/29.jpeg",
      30: "Stages/PuzzleSet14/imageonline/30.jpeg",
      31: "Stages/PuzzleSet14/imageonline/31.jpeg",
      32: "Stages/PuzzleSet14/imageonline/32.jpeg",
      33: "Stages/PuzzleSet14/imageonline/33.jpeg",
      34: "Stages/PuzzleSet14/imageonline/34.jpeg",
      35: "Stages/PuzzleSet14/imageonline/35.jpeg",
      36: "Stages/PuzzleSet14/imageonline/36.jpeg",
    },
    // STAGE : 15- (3X3)
    {
      1: "Stages/PuzzleSet15/imageonline/1.jpeg",
      2: "Stages/PuzzleSet15/imageonline/2.jpeg",
      3: "Stages/PuzzleSet15/imageonline/3.jpeg",
      4: "Stages/PuzzleSet15/imageonline/4.jpeg",
      5: "Stages/PuzzleSet15/imageonline/5.jpeg",
      6: "Stages/PuzzleSet15/imageonline/6.jpeg",
      7: "Stages/PuzzleSet15/imageonline/7.jpeg",
      8: "Stages/PuzzleSet15/imageonline/8.jpeg",
      9: "Stages/PuzzleSet15/imageonline/9.jpeg",
    },
    // STAGE : 16- (3X3)
    {
      1: "Stages/PuzzleSet16/imageonline/1.jpeg",
      2: "Stages/PuzzleSet16/imageonline/2.jpeg",
      3: "Stages/PuzzleSet16/imageonline/3.jpeg",
      4: "Stages/PuzzleSet16/imageonline/4.jpeg",
      5: "Stages/PuzzleSet16/imageonline/5.jpeg",
      6: "Stages/PuzzleSet16/imageonline/6.jpeg",
      7: "Stages/PuzzleSet16/imageonline/7.jpeg",
      8: "Stages/PuzzleSet16/imageonline/8.jpeg",
      9: "Stages/PuzzleSet16/imageonline/9.jpeg",
    },
    // STAGE : 17- (4X4)
    {
      1: "Stages/PuzzleSet17/imageonline/1.jpeg",
      2: "Stages/PuzzleSet17/imageonline/2.jpeg",
      3: "Stages/PuzzleSet17/imageonline/3.jpeg",
      4: "Stages/PuzzleSet17/imageonline/4.jpeg",
      5: "Stages/PuzzleSet17/imageonline/5.jpeg",
      6: "Stages/PuzzleSet17/imageonline/6.jpeg",
      7: "Stages/PuzzleSet17/imageonline/7.jpeg",
      8: "Stages/PuzzleSet17/imageonline/8.jpeg",
      9: "Stages/PuzzleSet17/imageonline/9.jpeg",

      10: "Stages/PuzzleSet17/imageonline/10.jpeg",
      11: "Stages/PuzzleSet17/imageonline/11.jpeg",
      12: "Stages/PuzzleSet17/imageonline/12.jpeg",
      13: "Stages/PuzzleSet17/imageonline/13.jpeg",
      14: "Stages/PuzzleSet17/imageonline/14.jpeg",
      15: "Stages/PuzzleSet17/imageonline/15.jpeg",
      16: "Stages/PuzzleSet17/imageonline/16.jpeg",
    },
    // STAGE : 18- (4X4)
    {
      1: "Stages/PuzzleSet18/imageonline/1.jpeg",
      2: "Stages/PuzzleSet18/imageonline/2.jpeg",
      3: "Stages/PuzzleSet18/imageonline/3.jpeg",
      4: "Stages/PuzzleSet18/imageonline/4.jpeg",
      5: "Stages/PuzzleSet18/imageonline/5.jpeg",
      6: "Stages/PuzzleSet18/imageonline/6.jpeg",
      7: "Stages/PuzzleSet18/imageonline/7.jpeg",
      8: "Stages/PuzzleSet18/imageonline/8.jpeg",
      9: "Stages/PuzzleSet18/imageonline/9.jpeg",

      10: "Stages/PuzzleSet18/imageonline/10.jpeg",
      11: "Stages/PuzzleSet18/imageonline/11.jpeg",
      12: "Stages/PuzzleSet18/imageonline/12.jpeg",
      13: "Stages/PuzzleSet18/imageonline/13.jpeg",
      14: "Stages/PuzzleSet18/imageonline/14.jpeg",
      15: "Stages/PuzzleSet18/imageonline/15.jpeg",
      16: "Stages/PuzzleSet18/imageonline/16.jpeg",
    },
    // STAGE : 19- (5X5)
    {
      1: "Stages/PuzzleSet19/imageonline/1.jpeg",
      2: "Stages/PuzzleSet19/imageonline/2.jpeg",
      3: "Stages/PuzzleSet19/imageonline/3.jpeg",
      4: "Stages/PuzzleSet19/imageonline/4.jpeg",
      5: "Stages/PuzzleSet19/imageonline/5.jpeg",
      6: "Stages/PuzzleSet19/imageonline/6.jpeg",
      7: "Stages/PuzzleSet19/imageonline/7.jpeg",
      8: "Stages/PuzzleSet19/imageonline/8.jpeg",
      9: "Stages/PuzzleSet19/imageonline/9.jpeg",

      10: "Stages/PuzzleSet19/imageonline/10.jpeg",
      11: "Stages/PuzzleSet19/imageonline/11.jpeg",
      12: "Stages/PuzzleSet19/imageonline/12.jpeg",
      13: "Stages/PuzzleSet19/imageonline/13.jpeg",
      14: "Stages/PuzzleSet19/imageonline/14.jpeg",
      15: "Stages/PuzzleSet19/imageonline/15.jpeg",
      16: "Stages/PuzzleSet19/imageonline/16.jpeg",

      17: "Stages/PuzzleSet19/imageonline/17.jpeg",
      18: "Stages/PuzzleSet19/imageonline/18.jpeg",
      19: "Stages/PuzzleSet19/imageonline/19.jpeg",
      20: "Stages/PuzzleSet19/imageonline/20.jpeg",
      21: "Stages/PuzzleSet19/imageonline/21.jpeg",
      22: "Stages/PuzzleSet19/imageonline/22.jpeg",
      23: "Stages/PuzzleSet19/imageonline/23.jpeg",
      24: "Stages/PuzzleSet19/imageonline/24.jpeg",
      25: "Stages/PuzzleSet19/imageonline/25.jpeg",
    },
    // STAGE : 20 - (5X5)
    {
      1: "Stages/PuzzleSet20/imageonline/1.jpeg",
      2: "Stages/PuzzleSet20/imageonline/2.jpeg",
      3: "Stages/PuzzleSet20/imageonline/3.jpeg",
      4: "Stages/PuzzleSet20/imageonline/4.jpeg",
      5: "Stages/PuzzleSet20/imageonline/5.jpeg",
      6: "Stages/PuzzleSet20/imageonline/6.jpeg",
      7: "Stages/PuzzleSet20/imageonline/7.jpeg",
      8: "Stages/PuzzleSet20/imageonline/8.jpeg",
      9: "Stages/PuzzleSet20/imageonline/9.jpeg",

      10: "Stages/PuzzleSet20/imageonline/10.jpeg",
      11: "Stages/PuzzleSet20/imageonline/11.jpeg",
      12: "Stages/PuzzleSet20/imageonline/12.jpeg",
      13: "Stages/PuzzleSet20/imageonline/13.jpeg",
      14: "Stages/PuzzleSet20/imageonline/14.jpeg",
      15: "Stages/PuzzleSet20/imageonline/15.jpeg",
      16: "Stages/PuzzleSet20/imageonline/16.jpeg",

      17: "Stages/PuzzleSet20/imageonline/17.jpeg",
      18: "Stages/PuzzleSet20/imageonline/18.jpeg",
      19: "Stages/PuzzleSet20/imageonline/19.jpeg",
      20: "Stages/PuzzleSet20/imageonline/20.jpeg",
      21: "Stages/PuzzleSet20/imageonline/21.jpeg",
      22: "Stages/PuzzleSet20/imageonline/22.jpeg",
      23: "Stages/PuzzleSet20/imageonline/23.jpeg",
      24: "Stages/PuzzleSet20/imageonline/24.jpeg",
      25: "Stages/PuzzleSet20/imageonline/25.jpeg",
    },
    // STAGE : 21- (6X6)
    {
      1: "Stages/PuzzleSet21/imageonline/1.png",
      2: "Stages/PuzzleSet21/imageonline/2.png",
      3: "Stages/PuzzleSet21/imageonline/3.png",
      4: "Stages/PuzzleSet21/imageonline/4.png",
      5: "Stages/PuzzleSet21/imageonline/5.png",
      6: "Stages/PuzzleSet21/imageonline/6.png",
      7: "Stages/PuzzleSet21/imageonline/7.png",
      8: "Stages/PuzzleSet21/imageonline/8.png",
      9: "Stages/PuzzleSet21/imageonline/9.png",

      10: "Stages/PuzzleSet21/imageonline/10.png",
      11: "Stages/PuzzleSet21/imageonline/11.png",
      12: "Stages/PuzzleSet21/imageonline/12.png",
      13: "Stages/PuzzleSet21/imageonline/13.png",
      14: "Stages/PuzzleSet21/imageonline/14.png",
      15: "Stages/PuzzleSet21/imageonline/15.png",
      16: "Stages/PuzzleSet21/imageonline/16.png",

      17: "Stages/PuzzleSet21/imageonline/17.png",
      18: "Stages/PuzzleSet21/imageonline/18.png",
      19: "Stages/PuzzleSet21/imageonline/19.png",
      20: "Stages/PuzzleSet21/imageonline/20.png",
      21: "Stages/PuzzleSet21/imageonline/21.png",
      22: "Stages/PuzzleSet21/imageonline/22.png",
      23: "Stages/PuzzleSet21/imageonline/23.png",
      24: "Stages/PuzzleSet21/imageonline/24.png",
      25: "Stages/PuzzleSet21/imageonline/25.png",

      26: "Stages/PuzzleSet21/imageonline/26.png",
      27: "Stages/PuzzleSet21/imageonline/27.png",
      28: "Stages/PuzzleSet21/imageonline/28.png",
      29: "Stages/PuzzleSet21/imageonline/29.png",
      30: "Stages/PuzzleSet21/imageonline/30.png",
      31: "Stages/PuzzleSet21/imageonline/31.png",
      32: "Stages/PuzzleSet21/imageonline/32.png",
      33: "Stages/PuzzleSet21/imageonline/33.png",
      34: "Stages/PuzzleSet21/imageonline/34.png",
      35: "Stages/PuzzleSet21/imageonline/35.png",
      36: "Stages/PuzzleSet21/imageonline/36.png",
    },
    // STAGE : 22- (6X6)
    {
      1: "Stages/PuzzleSet22/imageonline/1.jpeg",
      2: "Stages/PuzzleSet22/imageonline/2.jpeg",
      3: "Stages/PuzzleSet22/imageonline/3.jpeg",
      4: "Stages/PuzzleSet22/imageonline/4.jpeg",
      5: "Stages/PuzzleSet22/imageonline/5.jpeg",
      6: "Stages/PuzzleSet22/imageonline/6.jpeg",
      7: "Stages/PuzzleSet22/imageonline/7.jpeg",
      8: "Stages/PuzzleSet22/imageonline/8.jpeg",
      9: "Stages/PuzzleSet22/imageonline/9.jpeg",

      10: "Stages/PuzzleSet22/imageonline/10.jpeg",
      11: "Stages/PuzzleSet22/imageonline/11.jpeg",
      12: "Stages/PuzzleSet22/imageonline/12.jpeg",
      13: "Stages/PuzzleSet22/imageonline/13.jpeg",
      14: "Stages/PuzzleSet22/imageonline/14.jpeg",
      15: "Stages/PuzzleSet22/imageonline/15.jpeg",
      16: "Stages/PuzzleSet22/imageonline/16.jpeg",

      17: "Stages/PuzzleSet22/imageonline/17.jpeg",
      18: "Stages/PuzzleSet22/imageonline/18.jpeg",
      19: "Stages/PuzzleSet22/imageonline/19.jpeg",
      20: "Stages/PuzzleSet22/imageonline/20.jpeg",
      21: "Stages/PuzzleSet22/imageonline/21.jpeg",
      22: "Stages/PuzzleSet22/imageonline/22.jpeg",
      23: "Stages/PuzzleSet22/imageonline/23.jpeg",
      24: "Stages/PuzzleSet22/imageonline/24.jpeg",
      25: "Stages/PuzzleSet22/imageonline/25.jpeg",

      26: "Stages/PuzzleSet22/imageonline/26.jpeg",
      27: "Stages/PuzzleSet22/imageonline/27.jpeg",
      28: "Stages/PuzzleSet22/imageonline/28.jpeg",
      29: "Stages/PuzzleSet22/imageonline/29.jpeg",
      30: "Stages/PuzzleSet22/imageonline/30.jpeg",
      31: "Stages/PuzzleSet22/imageonline/31.jpeg",
      32: "Stages/PuzzleSet22/imageonline/32.jpeg",
      33: "Stages/PuzzleSet22/imageonline/33.jpeg",
      34: "Stages/PuzzleSet22/imageonline/34.jpeg",
      35: "Stages/PuzzleSet22/imageonline/35.jpeg",
      36: "Stages/PuzzleSet22/imageonline/36.jpeg",
    },
    // STAGE : 23- (3X3)
    {
      1: "Stages/PuzzleSet23/imageonline/1.jpeg",
      2: "Stages/PuzzleSet23/imageonline/2.jpeg",
      3: "Stages/PuzzleSet23/imageonline/3.jpeg",
      4: "Stages/PuzzleSet23/imageonline/4.jpeg",
      5: "Stages/PuzzleSet23/imageonline/5.jpeg",
      6: "Stages/PuzzleSet23/imageonline/6.jpeg",
      7: "Stages/PuzzleSet23/imageonline/7.jpeg",
      8: "Stages/PuzzleSet23/imageonline/8.jpeg",
      9: "Stages/PuzzleSet23/imageonline/9.jpeg",
    },
    // STAGE : 24- (4X4)
    {
      1: "Stages/PuzzleSet24/imageonline/1.jpeg",
      2: "Stages/PuzzleSet24/imageonline/2.jpeg",
      3: "Stages/PuzzleSet24/imageonline/3.jpeg",
      4: "Stages/PuzzleSet24/imageonline/4.jpeg",
      5: "Stages/PuzzleSet24/imageonline/5.jpeg",
      6: "Stages/PuzzleSet24/imageonline/6.jpeg",
      7: "Stages/PuzzleSet24/imageonline/7.jpeg",
      8: "Stages/PuzzleSet24/imageonline/8.jpeg",
      9: "Stages/PuzzleSet24/imageonline/9.jpeg",

      10: "Stages/PuzzleSet24/imageonline/10.jpeg",
      11: "Stages/PuzzleSet24/imageonline/11.jpeg",
      12: "Stages/PuzzleSet24/imageonline/12.jpeg",
      13: "Stages/PuzzleSet24/imageonline/13.jpeg",
      14: "Stages/PuzzleSet24/imageonline/14.jpeg",
      15: "Stages/PuzzleSet24/imageonline/15.jpeg",
      16: "Stages/PuzzleSet24/imageonline/16.jpeg",
    },
    // STAGE : 25- (5X5)
    {
      1: "Stages/PuzzleSet25/imageonline/1.jpeg",
      2: "Stages/PuzzleSet25/imageonline/2.jpeg",
      3: "Stages/PuzzleSet25/imageonline/3.jpeg",
      4: "Stages/PuzzleSet25/imageonline/4.jpeg",
      5: "Stages/PuzzleSet25/imageonline/5.jpeg",
      6: "Stages/PuzzleSet25/imageonline/6.jpeg",
      7: "Stages/PuzzleSet25/imageonline/7.jpeg",
      8: "Stages/PuzzleSet25/imageonline/8.jpeg",
      9: "Stages/PuzzleSet25/imageonline/9.jpeg",

      10: "Stages/PuzzleSet25/imageonline/10.jpeg",
      11: "Stages/PuzzleSet25/imageonline/11.jpeg",
      12: "Stages/PuzzleSet25/imageonline/12.jpeg",
      13: "Stages/PuzzleSet25/imageonline/13.jpeg",
      14: "Stages/PuzzleSet25/imageonline/14.jpeg",
      15: "Stages/PuzzleSet25/imageonline/15.jpeg",
      16: "Stages/PuzzleSet25/imageonline/16.jpeg",

      17: "Stages/PuzzleSet25/imageonline/17.jpeg",
      18: "Stages/PuzzleSet25/imageonline/18.jpeg",
      19: "Stages/PuzzleSet25/imageonline/19.jpeg",
      20: "Stages/PuzzleSet25/imageonline/20.jpeg",
      21: "Stages/PuzzleSet25/imageonline/21.jpeg",
      22: "Stages/PuzzleSet25/imageonline/22.jpeg",
      23: "Stages/PuzzleSet25/imageonline/23.jpeg",
      24: "Stages/PuzzleSet25/imageonline/24.jpeg",
      25: "Stages/PuzzleSet25/imageonline/25.jpeg",
    },
    // STAGE : 26- (6X6)
    {
      1: "Stages/PuzzleSet26/imageonline/1.jpeg",
      2: "Stages/PuzzleSet26/imageonline/2.jpeg",
      3: "Stages/PuzzleSet26/imageonline/3.jpeg",
      4: "Stages/PuzzleSet26/imageonline/4.jpeg",
      5: "Stages/PuzzleSet26/imageonline/5.jpeg",
      6: "Stages/PuzzleSet26/imageonline/6.jpeg",
      7: "Stages/PuzzleSet26/imageonline/7.jpeg",
      8: "Stages/PuzzleSet26/imageonline/8.jpeg",
      9: "Stages/PuzzleSet26/imageonline/9.jpeg",

      10: "Stages/PuzzleSet26/imageonline/10.jpeg",
      11: "Stages/PuzzleSet26/imageonline/11.jpeg",
      12: "Stages/PuzzleSet26/imageonline/12.jpeg",
      13: "Stages/PuzzleSet26/imageonline/13.jpeg",
      14: "Stages/PuzzleSet26/imageonline/14.jpeg",
      15: "Stages/PuzzleSet26/imageonline/15.jpeg",
      16: "Stages/PuzzleSet26/imageonline/16.jpeg",

      17: "Stages/PuzzleSet26/imageonline/17.jpeg",
      18: "Stages/PuzzleSet26/imageonline/18.jpeg",
      19: "Stages/PuzzleSet26/imageonline/19.jpeg",
      20: "Stages/PuzzleSet26/imageonline/20.jpeg",
      21: "Stages/PuzzleSet26/imageonline/21.jpeg",
      22: "Stages/PuzzleSet26/imageonline/22.jpeg",
      23: "Stages/PuzzleSet26/imageonline/23.jpeg",
      24: "Stages/PuzzleSet26/imageonline/24.jpeg",
      25: "Stages/PuzzleSet26/imageonline/25.jpeg",

      26: "Stages/PuzzleSet26/imageonline/26.jpeg",
      27: "Stages/PuzzleSet26/imageonline/27.jpeg",
      28: "Stages/PuzzleSet26/imageonline/28.jpeg",
      29: "Stages/PuzzleSet26/imageonline/29.jpeg",
      30: "Stages/PuzzleSet26/imageonline/30.jpeg",
      31: "Stages/PuzzleSet26/imageonline/31.jpeg",
      32: "Stages/PuzzleSet26/imageonline/32.jpeg",
      33: "Stages/PuzzleSet26/imageonline/33.jpeg",
      34: "Stages/PuzzleSet26/imageonline/34.jpeg",
      35: "Stages/PuzzleSet26/imageonline/35.jpeg",
      36: "Stages/PuzzleSet26/imageonline/36.jpeg",
    },
    // STAGE : 27- (7X7)
    {
      1: "Stages/PuzzleSet27/imageonline/1.jpeg",
      2: "Stages/PuzzleSet27/imageonline/2.jpeg",
      3: "Stages/PuzzleSet27/imageonline/3.jpeg",
      4: "Stages/PuzzleSet27/imageonline/4.jpeg",
      5: "Stages/PuzzleSet27/imageonline/5.jpeg",
      6: "Stages/PuzzleSet27/imageonline/6.jpeg",
      7: "Stages/PuzzleSet27/imageonline/7.jpeg",
      8: "Stages/PuzzleSet27/imageonline/8.jpeg",
      9: "Stages/PuzzleSet27/imageonline/9.jpeg",

      10: "Stages/PuzzleSet27/imageonline/10.jpeg",
      11: "Stages/PuzzleSet27/imageonline/11.jpeg",
      12: "Stages/PuzzleSet27/imageonline/12.jpeg",
      13: "Stages/PuzzleSet27/imageonline/13.jpeg",
      14: "Stages/PuzzleSet27/imageonline/14.jpeg",
      15: "Stages/PuzzleSet27/imageonline/15.jpeg",
      16: "Stages/PuzzleSet27/imageonline/16.jpeg",

      17: "Stages/PuzzleSet27/imageonline/17.jpeg",
      18: "Stages/PuzzleSet27/imageonline/18.jpeg",
      19: "Stages/PuzzleSet27/imageonline/19.jpeg",
      20: "Stages/PuzzleSet27/imageonline/20.jpeg",
      21: "Stages/PuzzleSet27/imageonline/21.jpeg",
      22: "Stages/PuzzleSet27/imageonline/22.jpeg",
      23: "Stages/PuzzleSet27/imageonline/23.jpeg",
      24: "Stages/PuzzleSet27/imageonline/24.jpeg",
      25: "Stages/PuzzleSet27/imageonline/25.jpeg",

      26: "Stages/PuzzleSet27/imageonline/26.jpeg",
      27: "Stages/PuzzleSet27/imageonline/27.jpeg",
      28: "Stages/PuzzleSet27/imageonline/28.jpeg",
      29: "Stages/PuzzleSet27/imageonline/29.jpeg",
      30: "Stages/PuzzleSet27/imageonline/30.jpeg",
      31: "Stages/PuzzleSet27/imageonline/31.jpeg",
      32: "Stages/PuzzleSet27/imageonline/32.jpeg",
      33: "Stages/PuzzleSet27/imageonline/33.jpeg",
      34: "Stages/PuzzleSet27/imageonline/34.jpeg",
      35: "Stages/PuzzleSet27/imageonline/35.jpeg",
      36: "Stages/PuzzleSet27/imageonline/36.jpeg",

      37: "Stages/PuzzleSet27/imageonline/37.jpeg",
      38: "Stages/PuzzleSet27/imageonline/38.jpeg",
      39: "Stages/PuzzleSet27/imageonline/39.jpeg",
      40: "Stages/PuzzleSet27/imageonline/40.jpeg",
      41: "Stages/PuzzleSet27/imageonline/41.jpeg",
      42: "Stages/PuzzleSet27/imageonline/42.jpeg",
      43: "Stages/PuzzleSet27/imageonline/43.jpeg",
      44: "Stages/PuzzleSet27/imageonline/44.jpeg",
      45: "Stages/PuzzleSet27/imageonline/45.jpeg",
      46: "Stages/PuzzleSet27/imageonline/46.jpeg",
      47: "Stages/PuzzleSet27/imageonline/47.jpeg",
      48: "Stages/PuzzleSet27/imageonline/48.jpeg",
      49: "Stages/PuzzleSet27/imageonline/49.jpeg",
    },
    // STAGE : 28- (7X7)
    {
      1: "Stages/PuzzleSet28/imageonline/1.jpeg",
      2: "Stages/PuzzleSet28/imageonline/2.jpeg",
      3: "Stages/PuzzleSet28/imageonline/3.jpeg",
      4: "Stages/PuzzleSet28/imageonline/4.jpeg",
      5: "Stages/PuzzleSet28/imageonline/5.jpeg",
      6: "Stages/PuzzleSet28/imageonline/6.jpeg",
      7: "Stages/PuzzleSet28/imageonline/7.jpeg",
      8: "Stages/PuzzleSet28/imageonline/8.jpeg",
      9: "Stages/PuzzleSet28/imageonline/9.jpeg",

      10: "Stages/PuzzleSet28/imageonline/10.jpeg",
      11: "Stages/PuzzleSet28/imageonline/11.jpeg",
      12: "Stages/PuzzleSet28/imageonline/12.jpeg",
      13: "Stages/PuzzleSet28/imageonline/13.jpeg",
      14: "Stages/PuzzleSet28/imageonline/14.jpeg",
      15: "Stages/PuzzleSet28/imageonline/15.jpeg",
      16: "Stages/PuzzleSet28/imageonline/16.jpeg",

      17: "Stages/PuzzleSet28/imageonline/17.jpeg",
      18: "Stages/PuzzleSet28/imageonline/18.jpeg",
      19: "Stages/PuzzleSet28/imageonline/19.jpeg",
      20: "Stages/PuzzleSet28/imageonline/20.jpeg",
      21: "Stages/PuzzleSet28/imageonline/21.jpeg",
      22: "Stages/PuzzleSet28/imageonline/22.jpeg",
      23: "Stages/PuzzleSet28/imageonline/23.jpeg",
      24: "Stages/PuzzleSet28/imageonline/24.jpeg",
      25: "Stages/PuzzleSet28/imageonline/25.jpeg",

      26: "Stages/PuzzleSet28/imageonline/26.jpeg",
      27: "Stages/PuzzleSet28/imageonline/27.jpeg",
      28: "Stages/PuzzleSet28/imageonline/28.jpeg",
      29: "Stages/PuzzleSet28/imageonline/29.jpeg",
      30: "Stages/PuzzleSet28/imageonline/30.jpeg",
      31: "Stages/PuzzleSet28/imageonline/31.jpeg",
      32: "Stages/PuzzleSet28/imageonline/32.jpeg",
      33: "Stages/PuzzleSet28/imageonline/33.jpeg",
      34: "Stages/PuzzleSet28/imageonline/34.jpeg",
      35: "Stages/PuzzleSet28/imageonline/35.jpeg",
      36: "Stages/PuzzleSet28/imageonline/36.jpeg",

      37: "Stages/PuzzleSet28/imageonline/37.jpeg",
      38: "Stages/PuzzleSet28/imageonline/38.jpeg",
      39: "Stages/PuzzleSet28/imageonline/39.jpeg",
      40: "Stages/PuzzleSet28/imageonline/40.jpeg",
      41: "Stages/PuzzleSet28/imageonline/41.jpeg",
      42: "Stages/PuzzleSet28/imageonline/42.jpeg",
      43: "Stages/PuzzleSet28/imageonline/43.jpeg",
      44: "Stages/PuzzleSet28/imageonline/44.jpeg",
      45: "Stages/PuzzleSet28/imageonline/45.jpeg",
      46: "Stages/PuzzleSet28/imageonline/46.jpeg",
      47: "Stages/PuzzleSet28/imageonline/47.jpeg",
      48: "Stages/PuzzleSet28/imageonline/48.jpeg",
      49: "Stages/PuzzleSet28/imageonline/49.jpeg",
    },
    // STAGE : 29- (3X3)
    {
      1: "Stages/PuzzleSet29/imageonline/1.jpeg",
      2: "Stages/PuzzleSet29/imageonline/2.jpeg",
      3: "Stages/PuzzleSet29/imageonline/3.jpeg",
      4: "Stages/PuzzleSet29/imageonline/4.jpeg",
      5: "Stages/PuzzleSet29/imageonline/5.jpeg",
      6: "Stages/PuzzleSet29/imageonline/6.jpeg",
      7: "Stages/PuzzleSet29/imageonline/7.jpeg",
      8: "Stages/PuzzleSet29/imageonline/8.jpeg",
      9: "Stages/PuzzleSet29/imageonline/9.jpeg",
    },
    // STAGE : 30- (4X4)
    {
      1: "Stages/PuzzleSet30/imageonline/1.jpg",
      2: "Stages/PuzzleSet30/imageonline/2.jpg",
      3: "Stages/PuzzleSet30/imageonline/3.jpg",
      4: "Stages/PuzzleSet30/imageonline/4.jpg",
      5: "Stages/PuzzleSet30/imageonline/5.jpg",
      6: "Stages/PuzzleSet30/imageonline/6.jpg",
      7: "Stages/PuzzleSet30/imageonline/7.jpg",
      8: "Stages/PuzzleSet30/imageonline/8.jpg",
      9: "Stages/PuzzleSet30/imageonline/9.jpg",

      10: "Stages/PuzzleSet30/imageonline/10.jpg",
      11: "Stages/PuzzleSet30/imageonline/11.jpg",
      12: "Stages/PuzzleSet30/imageonline/12.jpg",
      13: "Stages/PuzzleSet30/imageonline/13.jpg",
      14: "Stages/PuzzleSet30/imageonline/14.jpg",
      15: "Stages/PuzzleSet30/imageonline/15.jpg",
      16: "Stages/PuzzleSet30/imageonline/16.jpg",
    },
    // STAGE : 31- (5X5)
    {
      1: "Stages/PuzzleSet31/imageonline/1.jpeg",
      2: "Stages/PuzzleSet31/imageonline/2.jpeg",
      3: "Stages/PuzzleSet31/imageonline/3.jpeg",
      4: "Stages/PuzzleSet31/imageonline/4.jpeg",
      5: "Stages/PuzzleSet31/imageonline/5.jpeg",
      6: "Stages/PuzzleSet31/imageonline/6.jpeg",
      7: "Stages/PuzzleSet31/imageonline/7.jpeg",
      8: "Stages/PuzzleSet31/imageonline/8.jpeg",
      9: "Stages/PuzzleSet31/imageonline/9.jpeg",

      10: "Stages/PuzzleSet31/imageonline/10.jpeg",
      11: "Stages/PuzzleSet31/imageonline/11.jpeg",
      12: "Stages/PuzzleSet31/imageonline/12.jpeg",
      13: "Stages/PuzzleSet31/imageonline/13.jpeg",
      14: "Stages/PuzzleSet31/imageonline/14.jpeg",
      15: "Stages/PuzzleSet31/imageonline/15.jpeg",
      16: "Stages/PuzzleSet31/imageonline/16.jpeg",

      17: "Stages/PuzzleSet31/imageonline/17.jpeg",
      18: "Stages/PuzzleSet31/imageonline/18.jpeg",
      19: "Stages/PuzzleSet31/imageonline/19.jpeg",
      20: "Stages/PuzzleSet31/imageonline/20.jpeg",
      21: "Stages/PuzzleSet31/imageonline/21.jpeg",
      22: "Stages/PuzzleSet31/imageonline/22.jpeg",
      23: "Stages/PuzzleSet31/imageonline/23.jpeg",
      24: "Stages/PuzzleSet31/imageonline/24.jpeg",
      25: "Stages/PuzzleSet31/imageonline/25.jpeg",
    },
    // STAGE : 32- (6X6)
    {
      1: "Stages/PuzzleSet32/imageonline/1.jpeg",
      2: "Stages/PuzzleSet32/imageonline/2.jpeg",
      3: "Stages/PuzzleSet32/imageonline/3.jpeg",
      4: "Stages/PuzzleSet32/imageonline/4.jpeg",
      5: "Stages/PuzzleSet32/imageonline/5.jpeg",
      6: "Stages/PuzzleSet32/imageonline/6.jpeg",
      7: "Stages/PuzzleSet32/imageonline/7.jpeg",
      8: "Stages/PuzzleSet32/imageonline/8.jpeg",
      9: "Stages/PuzzleSet32/imageonline/9.jpeg",

      10: "Stages/PuzzleSet32/imageonline/10.jpeg",
      11: "Stages/PuzzleSet32/imageonline/11.jpeg",
      12: "Stages/PuzzleSet32/imageonline/12.jpeg",
      13: "Stages/PuzzleSet32/imageonline/13.jpeg",
      14: "Stages/PuzzleSet32/imageonline/14.jpeg",
      15: "Stages/PuzzleSet32/imageonline/15.jpeg",
      16: "Stages/PuzzleSet32/imageonline/16.jpeg",

      17: "Stages/PuzzleSet32/imageonline/17.jpeg",
      18: "Stages/PuzzleSet32/imageonline/18.jpeg",
      19: "Stages/PuzzleSet32/imageonline/19.jpeg",
      20: "Stages/PuzzleSet32/imageonline/20.jpeg",
      21: "Stages/PuzzleSet32/imageonline/21.jpeg",
      22: "Stages/PuzzleSet32/imageonline/22.jpeg",
      23: "Stages/PuzzleSet32/imageonline/23.jpeg",
      24: "Stages/PuzzleSet32/imageonline/24.jpeg",
      25: "Stages/PuzzleSet32/imageonline/25.jpeg",

      26: "Stages/PuzzleSet32/imageonline/26.jpeg",
      27: "Stages/PuzzleSet32/imageonline/27.jpeg",
      28: "Stages/PuzzleSet32/imageonline/28.jpeg",
      29: "Stages/PuzzleSet32/imageonline/29.jpeg",
      30: "Stages/PuzzleSet32/imageonline/30.jpeg",
      31: "Stages/PuzzleSet32/imageonline/31.jpeg",
      32: "Stages/PuzzleSet32/imageonline/32.jpeg",
      33: "Stages/PuzzleSet32/imageonline/33.jpeg",
      34: "Stages/PuzzleSet32/imageonline/34.jpeg",
      35: "Stages/PuzzleSet32/imageonline/35.jpeg",
      36: "Stages/PuzzleSet32/imageonline/36.jpeg",
    },
    // STAGE : 33- (7X7)
    {
      1: "Stages/PuzzleSet33/imageonline/1.jpeg",
      2: "Stages/PuzzleSet33/imageonline/2.jpeg",
      3: "Stages/PuzzleSet33/imageonline/3.jpeg",
      4: "Stages/PuzzleSet33/imageonline/4.jpeg",
      5: "Stages/PuzzleSet33/imageonline/5.jpeg",
      6: "Stages/PuzzleSet33/imageonline/6.jpeg",
      7: "Stages/PuzzleSet33/imageonline/7.jpeg",
      8: "Stages/PuzzleSet33/imageonline/8.jpeg",
      9: "Stages/PuzzleSet33/imageonline/9.jpeg",

      10: "Stages/PuzzleSet33/imageonline/10.jpeg",
      11: "Stages/PuzzleSet33/imageonline/11.jpeg",
      12: "Stages/PuzzleSet33/imageonline/12.jpeg",
      13: "Stages/PuzzleSet33/imageonline/13.jpeg",
      14: "Stages/PuzzleSet33/imageonline/14.jpeg",
      15: "Stages/PuzzleSet33/imageonline/15.jpeg",
      16: "Stages/PuzzleSet33/imageonline/16.jpeg",

      17: "Stages/PuzzleSet33/imageonline/17.jpeg",
      18: "Stages/PuzzleSet33/imageonline/18.jpeg",
      19: "Stages/PuzzleSet33/imageonline/19.jpeg",
      20: "Stages/PuzzleSet33/imageonline/20.jpeg",
      21: "Stages/PuzzleSet33/imageonline/21.jpeg",
      22: "Stages/PuzzleSet33/imageonline/22.jpeg",
      23: "Stages/PuzzleSet33/imageonline/23.jpeg",
      24: "Stages/PuzzleSet33/imageonline/24.jpeg",
      25: "Stages/PuzzleSet33/imageonline/25.jpeg",

      26: "Stages/PuzzleSet33/imageonline/26.jpeg",
      27: "Stages/PuzzleSet33/imageonline/27.jpeg",
      28: "Stages/PuzzleSet33/imageonline/28.jpeg",
      29: "Stages/PuzzleSet33/imageonline/29.jpeg",
      30: "Stages/PuzzleSet33/imageonline/30.jpeg",
      31: "Stages/PuzzleSet33/imageonline/31.jpeg",
      32: "Stages/PuzzleSet33/imageonline/32.jpeg",
      33: "Stages/PuzzleSet33/imageonline/33.jpeg",
      34: "Stages/PuzzleSet33/imageonline/34.jpeg",
      35: "Stages/PuzzleSet33/imageonline/35.jpeg",
      36: "Stages/PuzzleSet33/imageonline/36.jpeg",

      37: "Stages/PuzzleSet33/imageonline/37.jpeg",
      38: "Stages/PuzzleSet33/imageonline/38.jpeg",
      39: "Stages/PuzzleSet33/imageonline/39.jpeg",
      40: "Stages/PuzzleSet33/imageonline/40.jpeg",
      41: "Stages/PuzzleSet33/imageonline/41.jpeg",
      42: "Stages/PuzzleSet33/imageonline/42.jpeg",
      43: "Stages/PuzzleSet33/imageonline/43.jpeg",
      44: "Stages/PuzzleSet33/imageonline/44.jpeg",
      45: "Stages/PuzzleSet33/imageonline/45.jpeg",
      46: "Stages/PuzzleSet33/imageonline/46.jpeg",
      47: "Stages/PuzzleSet33/imageonline/47.jpeg",
      48: "Stages/PuzzleSet33/imageonline/48.jpeg",
      49: "Stages/PuzzleSet33/imageonline/49.jpeg",
    },
    // STAGE : 34- (7X7)
    {
      1: "Stages/PuzzleSet34/imageonline/1.jpeg",
      2: "Stages/PuzzleSet34/imageonline/2.jpeg",
      3: "Stages/PuzzleSet34/imageonline/3.jpeg",
      4: "Stages/PuzzleSet34/imageonline/4.jpeg",
      5: "Stages/PuzzleSet34/imageonline/5.jpeg",
      6: "Stages/PuzzleSet34/imageonline/6.jpeg",
      7: "Stages/PuzzleSet34/imageonline/7.jpeg",
      8: "Stages/PuzzleSet34/imageonline/8.jpeg",
      9: "Stages/PuzzleSet34/imageonline/9.jpeg",

      10: "Stages/PuzzleSet34/imageonline/10.jpeg",
      11: "Stages/PuzzleSet34/imageonline/11.jpeg",
      12: "Stages/PuzzleSet34/imageonline/12.jpeg",
      13: "Stages/PuzzleSet34/imageonline/13.jpeg",
      14: "Stages/PuzzleSet34/imageonline/14.jpeg",
      15: "Stages/PuzzleSet34/imageonline/15.jpeg",
      16: "Stages/PuzzleSet34/imageonline/16.jpeg",

      17: "Stages/PuzzleSet34/imageonline/17.jpeg",
      18: "Stages/PuzzleSet34/imageonline/18.jpeg",
      19: "Stages/PuzzleSet34/imageonline/19.jpeg",
      20: "Stages/PuzzleSet34/imageonline/20.jpeg",
      21: "Stages/PuzzleSet34/imageonline/21.jpeg",
      22: "Stages/PuzzleSet34/imageonline/22.jpeg",
      23: "Stages/PuzzleSet34/imageonline/23.jpeg",
      24: "Stages/PuzzleSet34/imageonline/24.jpeg",
      25: "Stages/PuzzleSet34/imageonline/25.jpeg",

      26: "Stages/PuzzleSet34/imageonline/26.jpeg",
      27: "Stages/PuzzleSet34/imageonline/27.jpeg",
      28: "Stages/PuzzleSet34/imageonline/28.jpeg",
      29: "Stages/PuzzleSet34/imageonline/29.jpeg",
      30: "Stages/PuzzleSet34/imageonline/30.jpeg",
      31: "Stages/PuzzleSet34/imageonline/31.jpeg",
      32: "Stages/PuzzleSet34/imageonline/32.jpeg",
      33: "Stages/PuzzleSet34/imageonline/33.jpeg",
      34: "Stages/PuzzleSet34/imageonline/34.jpeg",
      35: "Stages/PuzzleSet34/imageonline/35.jpeg",
      36: "Stages/PuzzleSet34/imageonline/36.jpeg",

      37: "Stages/PuzzleSet34/imageonline/37.jpeg",
      38: "Stages/PuzzleSet34/imageonline/38.jpeg",
      39: "Stages/PuzzleSet34/imageonline/39.jpeg",
      40: "Stages/PuzzleSet34/imageonline/40.jpeg",
      41: "Stages/PuzzleSet34/imageonline/41.jpeg",
      42: "Stages/PuzzleSet34/imageonline/42.jpeg",
      43: "Stages/PuzzleSet34/imageonline/43.jpeg",
      44: "Stages/PuzzleSet34/imageonline/44.jpeg",
      45: "Stages/PuzzleSet34/imageonline/45.jpeg",
      46: "Stages/PuzzleSet34/imageonline/46.jpeg",
      47: "Stages/PuzzleSet34/imageonline/47.jpeg",
      48: "Stages/PuzzleSet34/imageonline/48.jpeg",
      49: "Stages/PuzzleSet34/imageonline/49.jpeg",
    },
    // STAGE : 35- (7X7)
    {
      1: "Stages/PuzzleSet35/imageonline/1.jpeg",
      2: "Stages/PuzzleSet35/imageonline/2.jpeg",
      3: "Stages/PuzzleSet35/imageonline/3.jpeg",
      4: "Stages/PuzzleSet35/imageonline/4.jpeg",
      5: "Stages/PuzzleSet35/imageonline/5.jpeg",
      6: "Stages/PuzzleSet35/imageonline/6.jpeg",
      7: "Stages/PuzzleSet35/imageonline/7.jpeg",
      8: "Stages/PuzzleSet35/imageonline/8.jpeg",
      9: "Stages/PuzzleSet35/imageonline/9.jpeg",

      10: "Stages/PuzzleSet35/imageonline/10.jpeg",
      11: "Stages/PuzzleSet35/imageonline/11.jpeg",
      12: "Stages/PuzzleSet35/imageonline/12.jpeg",
      13: "Stages/PuzzleSet35/imageonline/13.jpeg",
      14: "Stages/PuzzleSet35/imageonline/14.jpeg",
      15: "Stages/PuzzleSet35/imageonline/15.jpeg",
      16: "Stages/PuzzleSet35/imageonline/16.jpeg",

      17: "Stages/PuzzleSet35/imageonline/17.jpeg",
      18: "Stages/PuzzleSet35/imageonline/18.jpeg",
      19: "Stages/PuzzleSet35/imageonline/19.jpeg",
      20: "Stages/PuzzleSet35/imageonline/20.jpeg",
      21: "Stages/PuzzleSet35/imageonline/21.jpeg",
      22: "Stages/PuzzleSet35/imageonline/22.jpeg",
      23: "Stages/PuzzleSet35/imageonline/23.jpeg",
      24: "Stages/PuzzleSet35/imageonline/24.jpeg",
      25: "Stages/PuzzleSet35/imageonline/25.jpeg",

      26: "Stages/PuzzleSet35/imageonline/26.jpeg",
      27: "Stages/PuzzleSet35/imageonline/27.jpeg",
      28: "Stages/PuzzleSet35/imageonline/28.jpeg",
      29: "Stages/PuzzleSet35/imageonline/29.jpeg",
      30: "Stages/PuzzleSet35/imageonline/30.jpeg",
      31: "Stages/PuzzleSet35/imageonline/31.jpeg",
      32: "Stages/PuzzleSet35/imageonline/32.jpeg",
      33: "Stages/PuzzleSet35/imageonline/33.jpeg",
      34: "Stages/PuzzleSet35/imageonline/34.jpeg",
      35: "Stages/PuzzleSet35/imageonline/35.jpeg",
      36: "Stages/PuzzleSet35/imageonline/36.jpeg",

      37: "Stages/PuzzleSet35/imageonline/37.jpeg",
      38: "Stages/PuzzleSet35/imageonline/38.jpeg",
      39: "Stages/PuzzleSet35/imageonline/39.jpeg",
      40: "Stages/PuzzleSet35/imageonline/40.jpeg",
      41: "Stages/PuzzleSet35/imageonline/41.jpeg",
      42: "Stages/PuzzleSet35/imageonline/42.jpeg",
      43: "Stages/PuzzleSet35/imageonline/43.jpeg",
      44: "Stages/PuzzleSet35/imageonline/44.jpeg",
      45: "Stages/PuzzleSet35/imageonline/45.jpeg",
      46: "Stages/PuzzleSet35/imageonline/46.jpeg",
      47: "Stages/PuzzleSet35/imageonline/47.jpeg",
      48: "Stages/PuzzleSet35/imageonline/48.jpeg",
      49: "Stages/PuzzleSet35/imageonline/49.jpeg",
    },
    // STAGE : 36- (7X7)
    {
      1: "Stages/PuzzleSet36/imageonline/1.jpeg",
      2: "Stages/PuzzleSet36/imageonline/2.jpeg",
      3: "Stages/PuzzleSet36/imageonline/3.jpeg",
      4: "Stages/PuzzleSet36/imageonline/4.jpeg",
      5: "Stages/PuzzleSet36/imageonline/5.jpeg",
      6: "Stages/PuzzleSet36/imageonline/6.jpeg",
      7: "Stages/PuzzleSet36/imageonline/7.jpeg",
      8: "Stages/PuzzleSet36/imageonline/8.jpeg",
      9: "Stages/PuzzleSet36/imageonline/9.jpeg",

      10: "Stages/PuzzleSet36/imageonline/10.jpeg",
      11: "Stages/PuzzleSet36/imageonline/11.jpeg",
      12: "Stages/PuzzleSet36/imageonline/12.jpeg",
      13: "Stages/PuzzleSet36/imageonline/13.jpeg",
      14: "Stages/PuzzleSet36/imageonline/14.jpeg",
      15: "Stages/PuzzleSet36/imageonline/15.jpeg",
      16: "Stages/PuzzleSet36/imageonline/16.jpeg",

      17: "Stages/PuzzleSet36/imageonline/17.jpeg",
      18: "Stages/PuzzleSet36/imageonline/18.jpeg",
      19: "Stages/PuzzleSet36/imageonline/19.jpeg",
      20: "Stages/PuzzleSet36/imageonline/20.jpeg",
      21: "Stages/PuzzleSet36/imageonline/21.jpeg",
      22: "Stages/PuzzleSet36/imageonline/22.jpeg",
      23: "Stages/PuzzleSet36/imageonline/23.jpeg",
      24: "Stages/PuzzleSet36/imageonline/24.jpeg",
      25: "Stages/PuzzleSet36/imageonline/25.jpeg",

      26: "Stages/PuzzleSet36/imageonline/26.jpeg",
      27: "Stages/PuzzleSet36/imageonline/27.jpeg",
      28: "Stages/PuzzleSet36/imageonline/28.jpeg",
      29: "Stages/PuzzleSet36/imageonline/29.jpeg",
      30: "Stages/PuzzleSet36/imageonline/30.jpeg",
      31: "Stages/PuzzleSet36/imageonline/31.jpeg",
      32: "Stages/PuzzleSet36/imageonline/32.jpeg",
      33: "Stages/PuzzleSet36/imageonline/33.jpeg",
      34: "Stages/PuzzleSet36/imageonline/34.jpeg",
      35: "Stages/PuzzleSet36/imageonline/35.jpeg",
      36: "Stages/PuzzleSet36/imageonline/36.jpeg",

      37: "Stages/PuzzleSet36/imageonline/37.jpeg",
      38: "Stages/PuzzleSet36/imageonline/38.jpeg",
      39: "Stages/PuzzleSet36/imageonline/39.jpeg",
      40: "Stages/PuzzleSet36/imageonline/40.jpeg",
      41: "Stages/PuzzleSet36/imageonline/41.jpeg",
      42: "Stages/PuzzleSet36/imageonline/42.jpeg",
      43: "Stages/PuzzleSet36/imageonline/43.jpeg",
      44: "Stages/PuzzleSet36/imageonline/44.jpeg",
      45: "Stages/PuzzleSet36/imageonline/45.jpeg",
      46: "Stages/PuzzleSet36/imageonline/46.jpeg",
      47: "Stages/PuzzleSet36/imageonline/47.jpeg",
      48: "Stages/PuzzleSet36/imageonline/48.jpeg",
      49: "Stages/PuzzleSet36/imageonline/49.jpeg",
    },
    // STAGE : 37- (7X7)
    {
      1: "Stages/PuzzleSet37/imageonline/1.jpeg",
      2: "Stages/PuzzleSet37/imageonline/2.jpeg",
      3: "Stages/PuzzleSet37/imageonline/3.jpeg",
      4: "Stages/PuzzleSet37/imageonline/4.jpeg",
      5: "Stages/PuzzleSet37/imageonline/5.jpeg",
      6: "Stages/PuzzleSet37/imageonline/6.jpeg",
      7: "Stages/PuzzleSet37/imageonline/7.jpeg",
      8: "Stages/PuzzleSet37/imageonline/8.jpeg",
      9: "Stages/PuzzleSet37/imageonline/9.jpeg",

      10: "Stages/PuzzleSet37/imageonline/10.jpeg",
      11: "Stages/PuzzleSet37/imageonline/11.jpeg",
      12: "Stages/PuzzleSet37/imageonline/12.jpeg",
      13: "Stages/PuzzleSet37/imageonline/13.jpeg",
      14: "Stages/PuzzleSet37/imageonline/14.jpeg",
      15: "Stages/PuzzleSet37/imageonline/15.jpeg",
      16: "Stages/PuzzleSet37/imageonline/16.jpeg",

      17: "Stages/PuzzleSet37/imageonline/17.jpeg",
      18: "Stages/PuzzleSet37/imageonline/18.jpeg",
      19: "Stages/PuzzleSet37/imageonline/19.jpeg",
      20: "Stages/PuzzleSet37/imageonline/20.jpeg",
      21: "Stages/PuzzleSet37/imageonline/21.jpeg",
      22: "Stages/PuzzleSet37/imageonline/22.jpeg",
      23: "Stages/PuzzleSet37/imageonline/23.jpeg",
      24: "Stages/PuzzleSet37/imageonline/24.jpeg",
      25: "Stages/PuzzleSet37/imageonline/25.jpeg",

      26: "Stages/PuzzleSet37/imageonline/26.jpeg",
      27: "Stages/PuzzleSet37/imageonline/27.jpeg",
      28: "Stages/PuzzleSet37/imageonline/28.jpeg",
      29: "Stages/PuzzleSet37/imageonline/29.jpeg",
      30: "Stages/PuzzleSet37/imageonline/30.jpeg",
      31: "Stages/PuzzleSet37/imageonline/31.jpeg",
      32: "Stages/PuzzleSet37/imageonline/32.jpeg",
      33: "Stages/PuzzleSet37/imageonline/33.jpeg",
      34: "Stages/PuzzleSet37/imageonline/34.jpeg",
      35: "Stages/PuzzleSet37/imageonline/35.jpeg",
      36: "Stages/PuzzleSet37/imageonline/36.jpeg",

      37: "Stages/PuzzleSet37/imageonline/37.jpeg",
      38: "Stages/PuzzleSet37/imageonline/38.jpeg",
      39: "Stages/PuzzleSet37/imageonline/39.jpeg",
      40: "Stages/PuzzleSet37/imageonline/40.jpeg",
      41: "Stages/PuzzleSet37/imageonline/41.jpeg",
      42: "Stages/PuzzleSet37/imageonline/42.jpeg",
      43: "Stages/PuzzleSet37/imageonline/43.jpeg",
      44: "Stages/PuzzleSet37/imageonline/44.jpeg",
      45: "Stages/PuzzleSet37/imageonline/45.jpeg",
      46: "Stages/PuzzleSet37/imageonline/46.jpeg",
      47: "Stages/PuzzleSet37/imageonline/47.jpeg",
      48: "Stages/PuzzleSet37/imageonline/48.jpeg",
      49: "Stages/PuzzleSet37/imageonline/49.jpeg",
    },
    // STAGE : 38- (3X3)
    {
      1: "Stages/PuzzleSet38/imageonline/1.jpeg",
      2: "Stages/PuzzleSet38/imageonline/2.jpeg",
      3: "Stages/PuzzleSet38/imageonline/3.jpeg",
      4: "Stages/PuzzleSet38/imageonline/4.jpeg",
      5: "Stages/PuzzleSet38/imageonline/5.jpeg",
      6: "Stages/PuzzleSet38/imageonline/6.jpeg",
      7: "Stages/PuzzleSet38/imageonline/7.jpeg",
      8: "Stages/PuzzleSet38/imageonline/8.jpeg",
      9: "Stages/PuzzleSet38/imageonline/9.jpeg",
    },
    // STAGE : 39 - (3X3)
    {
      1: "Stages/PuzzleSet39/imageonline/1.jpeg",
      2: "Stages/PuzzleSet39/imageonline/2.jpeg",
      3: "Stages/PuzzleSet39/imageonline/3.jpeg",
      4: "Stages/PuzzleSet39/imageonline/4.jpeg",
      5: "Stages/PuzzleSet39/imageonline/5.jpeg",
      6: "Stages/PuzzleSet39/imageonline/6.jpeg",
      7: "Stages/PuzzleSet39/imageonline/7.jpeg",
      8: "Stages/PuzzleSet39/imageonline/8.jpeg",
      9: "Stages/PuzzleSet39/imageonline/9.jpeg",
    },
    // STAGE : 40 -(4X4)
    {
      1: "Stages/PuzzleSet40/imageonline/1.jpeg",
      2: "Stages/PuzzleSet40/imageonline/2.jpeg",
      3: "Stages/PuzzleSet40/imageonline/3.jpeg",
      4: "Stages/PuzzleSet40/imageonline/4.jpeg",
      5: "Stages/PuzzleSet40/imageonline/5.jpeg",
      6: "Stages/PuzzleSet40/imageonline/6.jpeg",
      7: "Stages/PuzzleSet40/imageonline/7.jpeg",
      8: "Stages/PuzzleSet40/imageonline/8.jpeg",
      9: "Stages/PuzzleSet40/imageonline/9.jpeg",

      10: "Stages/PuzzleSet40/imageonline/10.jpeg",
      11: "Stages/PuzzleSet40/imageonline/11.jpeg",
      12: "Stages/PuzzleSet40/imageonline/12.jpeg",
      13: "Stages/PuzzleSet40/imageonline/13.jpeg",
      14: "Stages/PuzzleSet40/imageonline/14.jpeg",
      15: "Stages/PuzzleSet40/imageonline/15.jpeg",
      16: "Stages/PuzzleSet40/imageonline/16.jpeg",
    },
    // STAGE : 41 -(4X4)
    {
      1: "Stages/PuzzleSet41/imageonline/1.jpeg",
      2: "Stages/PuzzleSet41/imageonline/2.jpeg",
      3: "Stages/PuzzleSet41/imageonline/3.jpeg",
      4: "Stages/PuzzleSet41/imageonline/4.jpeg",
      5: "Stages/PuzzleSet41/imageonline/5.jpeg",
      6: "Stages/PuzzleSet41/imageonline/6.jpeg",
      7: "Stages/PuzzleSet41/imageonline/7.jpeg",
      8: "Stages/PuzzleSet41/imageonline/8.jpeg",
      9: "Stages/PuzzleSet41/imageonline/9.jpeg",

      10: "Stages/PuzzleSet41/imageonline/10.jpeg",
      11: "Stages/PuzzleSet41/imageonline/11.jpeg",
      12: "Stages/PuzzleSet41/imageonline/12.jpeg",
      13: "Stages/PuzzleSet41/imageonline/13.jpeg",
      14: "Stages/PuzzleSet41/imageonline/14.jpeg",
      15: "Stages/PuzzleSet41/imageonline/15.jpeg",
      16: "Stages/PuzzleSet41/imageonline/16.jpeg",
    },
    // STAGE : 42 -(5X5)
    {
      1: "Stages/PuzzleSet42/imageonline/1.jpeg",
      2: "Stages/PuzzleSet42/imageonline/2.jpeg",
      3: "Stages/PuzzleSet42/imageonline/3.jpeg",
      4: "Stages/PuzzleSet42/imageonline/4.jpeg",
      5: "Stages/PuzzleSet42/imageonline/5.jpeg",
      6: "Stages/PuzzleSet42/imageonline/6.jpeg",
      7: "Stages/PuzzleSet42/imageonline/7.jpeg",
      8: "Stages/PuzzleSet42/imageonline/8.jpeg",
      9: "Stages/PuzzleSet42/imageonline/9.jpeg",

      10: "Stages/PuzzleSet42/imageonline/10.jpeg",
      11: "Stages/PuzzleSet42/imageonline/11.jpeg",
      12: "Stages/PuzzleSet42/imageonline/12.jpeg",
      13: "Stages/PuzzleSet42/imageonline/13.jpeg",
      14: "Stages/PuzzleSet42/imageonline/14.jpeg",
      15: "Stages/PuzzleSet42/imageonline/15.jpeg",
      16: "Stages/PuzzleSet42/imageonline/16.jpeg",

      17: "Stages/PuzzleSet42/imageonline/17.jpeg",
      18: "Stages/PuzzleSet42/imageonline/18.jpeg",
      19: "Stages/PuzzleSet42/imageonline/19.jpeg",
      20: "Stages/PuzzleSet42/imageonline/20.jpeg",
      21: "Stages/PuzzleSet42/imageonline/21.jpeg",
      22: "Stages/PuzzleSet42/imageonline/22.jpeg",
      23: "Stages/PuzzleSet42/imageonline/23.jpeg",
      24: "Stages/PuzzleSet42/imageonline/24.jpeg",
      25: "Stages/PuzzleSet42/imageonline/25.jpeg",
    },
    // STAGE : 43 -(5X5)
    {
      1: "Stages/PuzzleSet43/imageonline/1.jpeg",
      2: "Stages/PuzzleSet43/imageonline/2.jpeg",
      3: "Stages/PuzzleSet43/imageonline/3.jpeg",
      4: "Stages/PuzzleSet43/imageonline/4.jpeg",
      5: "Stages/PuzzleSet43/imageonline/5.jpeg",
      6: "Stages/PuzzleSet43/imageonline/6.jpeg",
      7: "Stages/PuzzleSet43/imageonline/7.jpeg",
      8: "Stages/PuzzleSet43/imageonline/8.jpeg",
      9: "Stages/PuzzleSet43/imageonline/9.jpeg",

      10: "Stages/PuzzleSet43/imageonline/10.jpeg",
      11: "Stages/PuzzleSet43/imageonline/11.jpeg",
      12: "Stages/PuzzleSet43/imageonline/12.jpeg",
      13: "Stages/PuzzleSet43/imageonline/13.jpeg",
      14: "Stages/PuzzleSet43/imageonline/14.jpeg",
      15: "Stages/PuzzleSet43/imageonline/15.jpeg",
      16: "Stages/PuzzleSet43/imageonline/16.jpeg",

      17: "Stages/PuzzleSet43/imageonline/17.jpeg",
      18: "Stages/PuzzleSet43/imageonline/18.jpeg",
      19: "Stages/PuzzleSet43/imageonline/19.jpeg",
      20: "Stages/PuzzleSet43/imageonline/20.jpeg",
      21: "Stages/PuzzleSet43/imageonline/21.jpeg",
      22: "Stages/PuzzleSet43/imageonline/22.jpeg",
      23: "Stages/PuzzleSet43/imageonline/23.jpeg",
      24: "Stages/PuzzleSet43/imageonline/24.jpeg",
      25: "Stages/PuzzleSet43/imageonline/25.jpeg",
    },
    // STAGE : 44 -(6X6)
    {
      1: "Stages/PuzzleSet44/imageonline/1.jpeg",
      2: "Stages/PuzzleSet44/imageonline/2.jpeg",
      3: "Stages/PuzzleSet44/imageonline/3.jpeg",
      4: "Stages/PuzzleSet44/imageonline/4.jpeg",
      5: "Stages/PuzzleSet44/imageonline/5.jpeg",
      6: "Stages/PuzzleSet44/imageonline/6.jpeg",
      7: "Stages/PuzzleSet44/imageonline/7.jpeg",
      8: "Stages/PuzzleSet44/imageonline/8.jpeg",
      9: "Stages/PuzzleSet44/imageonline/9.jpeg",

      10: "Stages/PuzzleSet44/imageonline/10.jpeg",
      11: "Stages/PuzzleSet44/imageonline/11.jpeg",
      12: "Stages/PuzzleSet44/imageonline/12.jpeg",
      13: "Stages/PuzzleSet44/imageonline/13.jpeg",
      14: "Stages/PuzzleSet44/imageonline/14.jpeg",
      15: "Stages/PuzzleSet44/imageonline/15.jpeg",
      16: "Stages/PuzzleSet44/imageonline/16.jpeg",

      17: "Stages/PuzzleSet44/imageonline/17.jpeg",
      18: "Stages/PuzzleSet44/imageonline/18.jpeg",
      19: "Stages/PuzzleSet44/imageonline/19.jpeg",
      20: "Stages/PuzzleSet44/imageonline/20.jpeg",
      21: "Stages/PuzzleSet44/imageonline/21.jpeg",
      22: "Stages/PuzzleSet44/imageonline/22.jpeg",
      23: "Stages/PuzzleSet44/imageonline/23.jpeg",
      24: "Stages/PuzzleSet44/imageonline/24.jpeg",
      25: "Stages/PuzzleSet44/imageonline/25.jpeg",

      26: "Stages/PuzzleSet44/imageonline/26.jpeg",
      27: "Stages/PuzzleSet44/imageonline/27.jpeg",
      28: "Stages/PuzzleSet44/imageonline/28.jpeg",
      29: "Stages/PuzzleSet44/imageonline/29.jpeg",
      30: "Stages/PuzzleSet44/imageonline/30.jpeg",
      31: "Stages/PuzzleSet44/imageonline/31.jpeg",
      32: "Stages/PuzzleSet44/imageonline/32.jpeg",
      33: "Stages/PuzzleSet44/imageonline/33.jpeg",
      34: "Stages/PuzzleSet44/imageonline/34.jpeg",
      35: "Stages/PuzzleSet44/imageonline/35.jpeg",
      36: "Stages/PuzzleSet44/imageonline/36.jpeg",
    },
    // STAGE : 45 -(6X6)
    {
      1: "Stages/PuzzleSet45/imageonline/1.jpeg",
      2: "Stages/PuzzleSet45/imageonline/2.jpeg",
      3: "Stages/PuzzleSet45/imageonline/3.jpeg",
      4: "Stages/PuzzleSet45/imageonline/4.jpeg",
      5: "Stages/PuzzleSet45/imageonline/5.jpeg",
      6: "Stages/PuzzleSet45/imageonline/6.jpeg",
      7: "Stages/PuzzleSet45/imageonline/7.jpeg",
      8: "Stages/PuzzleSet45/imageonline/8.jpeg",
      9: "Stages/PuzzleSet45/imageonline/9.jpeg",

      10: "Stages/PuzzleSet45/imageonline/10.jpeg",
      11: "Stages/PuzzleSet45/imageonline/11.jpeg",
      12: "Stages/PuzzleSet45/imageonline/12.jpeg",
      13: "Stages/PuzzleSet45/imageonline/13.jpeg",
      14: "Stages/PuzzleSet45/imageonline/14.jpeg",
      15: "Stages/PuzzleSet45/imageonline/15.jpeg",
      16: "Stages/PuzzleSet45/imageonline/16.jpeg",

      17: "Stages/PuzzleSet45/imageonline/17.jpeg",
      18: "Stages/PuzzleSet45/imageonline/18.jpeg",
      19: "Stages/PuzzleSet45/imageonline/19.jpeg",
      20: "Stages/PuzzleSet45/imageonline/20.jpeg",
      21: "Stages/PuzzleSet45/imageonline/21.jpeg",
      22: "Stages/PuzzleSet45/imageonline/22.jpeg",
      23: "Stages/PuzzleSet45/imageonline/23.jpeg",
      24: "Stages/PuzzleSet45/imageonline/24.jpeg",
      25: "Stages/PuzzleSet45/imageonline/25.jpeg",

      26: "Stages/PuzzleSet45/imageonline/26.jpeg",
      27: "Stages/PuzzleSet45/imageonline/27.jpeg",
      28: "Stages/PuzzleSet45/imageonline/28.jpeg",
      29: "Stages/PuzzleSet45/imageonline/29.jpeg",
      30: "Stages/PuzzleSet45/imageonline/30.jpeg",
      31: "Stages/PuzzleSet45/imageonline/31.jpeg",
      32: "Stages/PuzzleSet45/imageonline/32.jpeg",
      33: "Stages/PuzzleSet45/imageonline/33.jpeg",
      34: "Stages/PuzzleSet45/imageonline/34.jpeg",
      35: "Stages/PuzzleSet45/imageonline/35.jpeg",
      36: "Stages/PuzzleSet45/imageonline/36.jpeg",
    },
    // STAGE : 46 -(7X7)
    {
      1: "Stages/PuzzleSet46/imageonline/1.jpeg",
      2: "Stages/PuzzleSet46/imageonline/2.jpeg",
      3: "Stages/PuzzleSet46/imageonline/3.jpeg",
      4: "Stages/PuzzleSet46/imageonline/4.jpeg",
      5: "Stages/PuzzleSet46/imageonline/5.jpeg",
      6: "Stages/PuzzleSet46/imageonline/6.jpeg",
      7: "Stages/PuzzleSet46/imageonline/7.jpeg",
      8: "Stages/PuzzleSet46/imageonline/8.jpeg",
      9: "Stages/PuzzleSet46/imageonline/9.jpeg",

      10: "Stages/PuzzleSet46/imageonline/10.jpeg",
      11: "Stages/PuzzleSet46/imageonline/11.jpeg",
      12: "Stages/PuzzleSet46/imageonline/12.jpeg",
      13: "Stages/PuzzleSet46/imageonline/13.jpeg",
      14: "Stages/PuzzleSet46/imageonline/14.jpeg",
      15: "Stages/PuzzleSet46/imageonline/15.jpeg",
      16: "Stages/PuzzleSet46/imageonline/16.jpeg",

      17: "Stages/PuzzleSet46/imageonline/17.jpeg",
      18: "Stages/PuzzleSet46/imageonline/18.jpeg",
      19: "Stages/PuzzleSet46/imageonline/19.jpeg",
      20: "Stages/PuzzleSet46/imageonline/20.jpeg",
      21: "Stages/PuzzleSet46/imageonline/21.jpeg",
      22: "Stages/PuzzleSet46/imageonline/22.jpeg",
      23: "Stages/PuzzleSet46/imageonline/23.jpeg",
      24: "Stages/PuzzleSet46/imageonline/24.jpeg",
      25: "Stages/PuzzleSet46/imageonline/25.jpeg",

      26: "Stages/PuzzleSet46/imageonline/26.jpeg",
      27: "Stages/PuzzleSet46/imageonline/27.jpeg",
      28: "Stages/PuzzleSet46/imageonline/28.jpeg",
      29: "Stages/PuzzleSet46/imageonline/29.jpeg",
      30: "Stages/PuzzleSet46/imageonline/30.jpeg",
      31: "Stages/PuzzleSet46/imageonline/31.jpeg",
      32: "Stages/PuzzleSet46/imageonline/32.jpeg",
      33: "Stages/PuzzleSet46/imageonline/33.jpeg",
      34: "Stages/PuzzleSet46/imageonline/34.jpeg",
      35: "Stages/PuzzleSet46/imageonline/35.jpeg",
      36: "Stages/PuzzleSet46/imageonline/36.jpeg",

      37: "Stages/PuzzleSet46/imageonline/37.jpeg",
      38: "Stages/PuzzleSet46/imageonline/38.jpeg",
      39: "Stages/PuzzleSet46/imageonline/39.jpeg",
      40: "Stages/PuzzleSet46/imageonline/40.jpeg",
      41: "Stages/PuzzleSet46/imageonline/41.jpeg",
      42: "Stages/PuzzleSet46/imageonline/42.jpeg",
      43: "Stages/PuzzleSet46/imageonline/43.jpeg",
      44: "Stages/PuzzleSet46/imageonline/44.jpeg",
      45: "Stages/PuzzleSet46/imageonline/45.jpeg",
      46: "Stages/PuzzleSet46/imageonline/46.jpeg",
      47: "Stages/PuzzleSet46/imageonline/47.jpeg",
      48: "Stages/PuzzleSet46/imageonline/48.jpeg",
      49: "Stages/PuzzleSet46/imageonline/49.jpeg",
    },
    // STAGE : 47 - (7X7)
    {
      1: "Stages/PuzzleSet47/imageonline/1.jpeg",
      2: "Stages/PuzzleSet47/imageonline/2.jpeg",
      3: "Stages/PuzzleSet47/imageonline/3.jpeg",
      4: "Stages/PuzzleSet47/imageonline/4.jpeg",
      5: "Stages/PuzzleSet47/imageonline/5.jpeg",
      6: "Stages/PuzzleSet47/imageonline/6.jpeg",
      7: "Stages/PuzzleSet47/imageonline/7.jpeg",
      8: "Stages/PuzzleSet47/imageonline/8.jpeg",
      9: "Stages/PuzzleSet47/imageonline/9.jpeg",

      10: "Stages/PuzzleSet47/imageonline/10.jpeg",
      11: "Stages/PuzzleSet47/imageonline/11.jpeg",
      12: "Stages/PuzzleSet47/imageonline/12.jpeg",
      13: "Stages/PuzzleSet47/imageonline/13.jpeg",
      14: "Stages/PuzzleSet47/imageonline/14.jpeg",
      15: "Stages/PuzzleSet47/imageonline/15.jpeg",
      16: "Stages/PuzzleSet47/imageonline/16.jpeg",

      17: "Stages/PuzzleSet47/imageonline/17.jpeg",
      18: "Stages/PuzzleSet47/imageonline/18.jpeg",
      19: "Stages/PuzzleSet47/imageonline/19.jpeg",
      20: "Stages/PuzzleSet47/imageonline/20.jpeg",
      21: "Stages/PuzzleSet47/imageonline/21.jpeg",
      22: "Stages/PuzzleSet47/imageonline/22.jpeg",
      23: "Stages/PuzzleSet47/imageonline/23.jpeg",
      24: "Stages/PuzzleSet47/imageonline/24.jpeg",
      25: "Stages/PuzzleSet47/imageonline/25.jpeg",

      26: "Stages/PuzzleSet47/imageonline/26.jpeg",
      27: "Stages/PuzzleSet47/imageonline/27.jpeg",
      28: "Stages/PuzzleSet47/imageonline/28.jpeg",
      29: "Stages/PuzzleSet47/imageonline/29.jpeg",
      30: "Stages/PuzzleSet47/imageonline/30.jpeg",
      31: "Stages/PuzzleSet47/imageonline/31.jpeg",
      32: "Stages/PuzzleSet47/imageonline/32.jpeg",
      33: "Stages/PuzzleSet47/imageonline/33.jpeg",
      34: "Stages/PuzzleSet47/imageonline/34.jpeg",
      35: "Stages/PuzzleSet47/imageonline/35.jpeg",
      36: "Stages/PuzzleSet47/imageonline/36.jpeg",

      37: "Stages/PuzzleSet47/imageonline/37.jpeg",
      38: "Stages/PuzzleSet47/imageonline/38.jpeg",
      39: "Stages/PuzzleSet47/imageonline/39.jpeg",
      40: "Stages/PuzzleSet47/imageonline/40.jpeg",
      41: "Stages/PuzzleSet47/imageonline/41.jpeg",
      42: "Stages/PuzzleSet47/imageonline/42.jpeg",
      43: "Stages/PuzzleSet47/imageonline/43.jpeg",
      44: "Stages/PuzzleSet47/imageonline/44.jpeg",
      45: "Stages/PuzzleSet47/imageonline/45.jpeg",
      46: "Stages/PuzzleSet47/imageonline/46.jpeg",
      47: "Stages/PuzzleSet47/imageonline/47.jpeg",
      48: "Stages/PuzzleSet47/imageonline/48.jpeg",
      49: "Stages/PuzzleSet47/imageonline/49.jpeg",
    },
    // STAGE : 48 -(8X8)
    {
      1: "Stages/PuzzleSet48/imageonline/1.jpeg",
      2: "Stages/PuzzleSet48/imageonline/2.jpeg",
      3: "Stages/PuzzleSet48/imageonline/3.jpeg",
      4: "Stages/PuzzleSet48/imageonline/4.jpeg",
      5: "Stages/PuzzleSet48/imageonline/5.jpeg",
      6: "Stages/PuzzleSet48/imageonline/6.jpeg",
      7: "Stages/PuzzleSet48/imageonline/7.jpeg",
      8: "Stages/PuzzleSet48/imageonline/8.jpeg",
      9: "Stages/PuzzleSet48/imageonline/9.jpeg",

      10: "Stages/PuzzleSet48/imageonline/10.jpeg",
      11: "Stages/PuzzleSet48/imageonline/11.jpeg",
      12: "Stages/PuzzleSet48/imageonline/12.jpeg",
      13: "Stages/PuzzleSet48/imageonline/13.jpeg",
      14: "Stages/PuzzleSet48/imageonline/14.jpeg",
      15: "Stages/PuzzleSet48/imageonline/15.jpeg",
      16: "Stages/PuzzleSet48/imageonline/16.jpeg",

      17: "Stages/PuzzleSet48/imageonline/17.jpeg",
      18: "Stages/PuzzleSet48/imageonline/18.jpeg",
      19: "Stages/PuzzleSet48/imageonline/19.jpeg",
      20: "Stages/PuzzleSet48/imageonline/20.jpeg",
      21: "Stages/PuzzleSet48/imageonline/21.jpeg",
      22: "Stages/PuzzleSet48/imageonline/22.jpeg",
      23: "Stages/PuzzleSet48/imageonline/23.jpeg",
      24: "Stages/PuzzleSet48/imageonline/24.jpeg",
      25: "Stages/PuzzleSet48/imageonline/25.jpeg",

      26: "Stages/PuzzleSet48/imageonline/26.jpeg",
      27: "Stages/PuzzleSet48/imageonline/27.jpeg",
      28: "Stages/PuzzleSet48/imageonline/28.jpeg",
      29: "Stages/PuzzleSet48/imageonline/29.jpeg",
      30: "Stages/PuzzleSet48/imageonline/30.jpeg",
      31: "Stages/PuzzleSet48/imageonline/31.jpeg",
      32: "Stages/PuzzleSet48/imageonline/32.jpeg",
      33: "Stages/PuzzleSet48/imageonline/33.jpeg",
      34: "Stages/PuzzleSet48/imageonline/34.jpeg",
      35: "Stages/PuzzleSet48/imageonline/35.jpeg",
      36: "Stages/PuzzleSet48/imageonline/36.jpeg",

      37: "Stages/PuzzleSet48/imageonline/37.jpeg",
      38: "Stages/PuzzleSet48/imageonline/38.jpeg",
      39: "Stages/PuzzleSet48/imageonline/39.jpeg",
      40: "Stages/PuzzleSet48/imageonline/40.jpeg",
      41: "Stages/PuzzleSet48/imageonline/41.jpeg",
      42: "Stages/PuzzleSet48/imageonline/42.jpeg",
      43: "Stages/PuzzleSet48/imageonline/43.jpeg",
      44: "Stages/PuzzleSet48/imageonline/44.jpeg",
      45: "Stages/PuzzleSet48/imageonline/45.jpeg",
      46: "Stages/PuzzleSet48/imageonline/46.jpeg",
      47: "Stages/PuzzleSet48/imageonline/47.jpeg",
      48: "Stages/PuzzleSet48/imageonline/48.jpeg",
      49: "Stages/PuzzleSet48/imageonline/49.jpeg",

      50: "Stages/PuzzleSet48/imageonline/50.jpeg",
      51: "Stages/PuzzleSet48/imageonline/51.jpeg",
      52: "Stages/PuzzleSet48/imageonline/52.jpeg",
      53: "Stages/PuzzleSet48/imageonline/53.jpeg",
      54: "Stages/PuzzleSet48/imageonline/54.jpeg",
      55: "Stages/PuzzleSet48/imageonline/55.jpeg",
      56: "Stages/PuzzleSet48/imageonline/56.jpeg",
      57: "Stages/PuzzleSet48/imageonline/57.jpeg",
      58: "Stages/PuzzleSet48/imageonline/58.jpeg",
      59: "Stages/PuzzleSet48/imageonline/59.jpeg",
      60: "Stages/PuzzleSet48/imageonline/60.jpeg",
      61: "Stages/PuzzleSet48/imageonline/61.jpeg",
      62: "Stages/PuzzleSet48/imageonline/62.jpeg",
      63: "Stages/PuzzleSet48/imageonline/63.jpeg",
      64: "Stages/PuzzleSet48/imageonline/64.jpeg",
    },
    // STAGE : 49 -(8X8)
    {
      1: "Stages/PuzzleSet49/imageonline/1.jpeg",
      2: "Stages/PuzzleSet49/imageonline/2.jpeg",
      3: "Stages/PuzzleSet49/imageonline/3.jpeg",
      4: "Stages/PuzzleSet49/imageonline/4.jpeg",
      5: "Stages/PuzzleSet49/imageonline/5.jpeg",
      6: "Stages/PuzzleSet49/imageonline/6.jpeg",
      7: "Stages/PuzzleSet49/imageonline/7.jpeg",
      8: "Stages/PuzzleSet49/imageonline/8.jpeg",
      9: "Stages/PuzzleSet49/imageonline/9.jpeg",

      10: "Stages/PuzzleSet49/imageonline/10.jpeg",
      11: "Stages/PuzzleSet49/imageonline/11.jpeg",
      12: "Stages/PuzzleSet49/imageonline/12.jpeg",
      13: "Stages/PuzzleSet49/imageonline/13.jpeg",
      14: "Stages/PuzzleSet49/imageonline/14.jpeg",
      15: "Stages/PuzzleSet49/imageonline/15.jpeg",
      16: "Stages/PuzzleSet49/imageonline/16.jpeg",

      17: "Stages/PuzzleSet49/imageonline/17.jpeg",
      18: "Stages/PuzzleSet49/imageonline/18.jpeg",
      19: "Stages/PuzzleSet49/imageonline/19.jpeg",
      20: "Stages/PuzzleSet49/imageonline/20.jpeg",
      21: "Stages/PuzzleSet49/imageonline/21.jpeg",
      22: "Stages/PuzzleSet49/imageonline/22.jpeg",
      23: "Stages/PuzzleSet49/imageonline/23.jpeg",
      24: "Stages/PuzzleSet49/imageonline/24.jpeg",
      25: "Stages/PuzzleSet49/imageonline/25.jpeg",

      26: "Stages/PuzzleSet49/imageonline/26.jpeg",
      27: "Stages/PuzzleSet49/imageonline/27.jpeg",
      28: "Stages/PuzzleSet49/imageonline/28.jpeg",
      29: "Stages/PuzzleSet49/imageonline/29.jpeg",
      30: "Stages/PuzzleSet49/imageonline/30.jpeg",
      31: "Stages/PuzzleSet49/imageonline/31.jpeg",
      32: "Stages/PuzzleSet49/imageonline/32.jpeg",
      33: "Stages/PuzzleSet49/imageonline/33.jpeg",
      34: "Stages/PuzzleSet49/imageonline/34.jpeg",
      35: "Stages/PuzzleSet49/imageonline/35.jpeg",
      36: "Stages/PuzzleSet49/imageonline/36.jpeg",

      37: "Stages/PuzzleSet49/imageonline/37.jpeg",
      38: "Stages/PuzzleSet49/imageonline/38.jpeg",
      39: "Stages/PuzzleSet49/imageonline/39.jpeg",
      40: "Stages/PuzzleSet49/imageonline/40.jpeg",
      41: "Stages/PuzzleSet49/imageonline/41.jpeg",
      42: "Stages/PuzzleSet49/imageonline/42.jpeg",
      43: "Stages/PuzzleSet49/imageonline/43.jpeg",
      44: "Stages/PuzzleSet49/imageonline/44.jpeg",
      45: "Stages/PuzzleSet49/imageonline/45.jpeg",
      46: "Stages/PuzzleSet49/imageonline/46.jpeg",
      47: "Stages/PuzzleSet49/imageonline/47.jpeg",
      48: "Stages/PuzzleSet49/imageonline/48.jpeg",
      49: "Stages/PuzzleSet49/imageonline/49.jpeg",

      50: "Stages/PuzzleSet49/imageonline/50.jpeg",
      51: "Stages/PuzzleSet49/imageonline/51.jpeg",
      52: "Stages/PuzzleSet49/imageonline/52.jpeg",
      53: "Stages/PuzzleSet49/imageonline/53.jpeg",
      54: "Stages/PuzzleSet49/imageonline/54.jpeg",
      55: "Stages/PuzzleSet49/imageonline/55.jpeg",
      56: "Stages/PuzzleSet49/imageonline/56.jpeg",
      57: "Stages/PuzzleSet49/imageonline/57.jpeg",
      58: "Stages/PuzzleSet49/imageonline/58.jpeg",
      59: "Stages/PuzzleSet49/imageonline/59.jpeg",
      60: "Stages/PuzzleSet49/imageonline/60.jpeg",
      61: "Stages/PuzzleSet49/imageonline/61.jpeg",
      62: "Stages/PuzzleSet49/imageonline/62.jpeg",
      63: "Stages/PuzzleSet49/imageonline/63.jpeg",
      64: "Stages/PuzzleSet49/imageonline/64.jpeg",
    },
    // STAGE : 50 -(8X8)
    {
      1: "Stages/PuzzleSet50/imageonline/1.jpeg",
      2: "Stages/PuzzleSet50/imageonline/2.jpeg",
      3: "Stages/PuzzleSet50/imageonline/3.jpeg",
      4: "Stages/PuzzleSet50/imageonline/4.jpeg",
      5: "Stages/PuzzleSet50/imageonline/5.jpeg",
      6: "Stages/PuzzleSet50/imageonline/6.jpeg",
      7: "Stages/PuzzleSet50/imageonline/7.jpeg",
      8: "Stages/PuzzleSet50/imageonline/8.jpeg",
      9: "Stages/PuzzleSet50/imageonline/9.jpeg",

      10: "Stages/PuzzleSet50/imageonline/10.jpeg",
      11: "Stages/PuzzleSet50/imageonline/11.jpeg",
      12: "Stages/PuzzleSet50/imageonline/12.jpeg",
      13: "Stages/PuzzleSet50/imageonline/13.jpeg",
      14: "Stages/PuzzleSet50/imageonline/14.jpeg",
      15: "Stages/PuzzleSet50/imageonline/15.jpeg",
      16: "Stages/PuzzleSet50/imageonline/16.jpeg",

      17: "Stages/PuzzleSet50/imageonline/17.jpeg",
      18: "Stages/PuzzleSet50/imageonline/18.jpeg",
      19: "Stages/PuzzleSet50/imageonline/19.jpeg",
      20: "Stages/PuzzleSet50/imageonline/20.jpeg",
      21: "Stages/PuzzleSet50/imageonline/21.jpeg",
      22: "Stages/PuzzleSet50/imageonline/22.jpeg",
      23: "Stages/PuzzleSet50/imageonline/23.jpeg",
      24: "Stages/PuzzleSet50/imageonline/24.jpeg",
      25: "Stages/PuzzleSet50/imageonline/25.jpeg",

      26: "Stages/PuzzleSet50/imageonline/26.jpeg",
      27: "Stages/PuzzleSet50/imageonline/27.jpeg",
      28: "Stages/PuzzleSet50/imageonline/28.jpeg",
      29: "Stages/PuzzleSet50/imageonline/29.jpeg",
      30: "Stages/PuzzleSet50/imageonline/30.jpeg",
      31: "Stages/PuzzleSet50/imageonline/31.jpeg",
      32: "Stages/PuzzleSet50/imageonline/32.jpeg",
      33: "Stages/PuzzleSet50/imageonline/33.jpeg",
      34: "Stages/PuzzleSet50/imageonline/34.jpeg",
      35: "Stages/PuzzleSet50/imageonline/35.jpeg",
      36: "Stages/PuzzleSet50/imageonline/36.jpeg",

      37: "Stages/PuzzleSet50/imageonline/37.jpeg",
      38: "Stages/PuzzleSet50/imageonline/38.jpeg",
      39: "Stages/PuzzleSet50/imageonline/39.jpeg",
      40: "Stages/PuzzleSet50/imageonline/40.jpeg",
      41: "Stages/PuzzleSet50/imageonline/41.jpeg",
      42: "Stages/PuzzleSet50/imageonline/42.jpeg",
      43: "Stages/PuzzleSet50/imageonline/43.jpeg",
      44: "Stages/PuzzleSet50/imageonline/44.jpeg",
      45: "Stages/PuzzleSet50/imageonline/45.jpeg",
      46: "Stages/PuzzleSet50/imageonline/46.jpeg",
      47: "Stages/PuzzleSet50/imageonline/47.jpeg",
      48: "Stages/PuzzleSet50/imageonline/48.jpeg",
      49: "Stages/PuzzleSet50/imageonline/49.jpeg",

      50: "Stages/PuzzleSet50/imageonline/50.jpeg",
      51: "Stages/PuzzleSet50/imageonline/51.jpeg",
      52: "Stages/PuzzleSet50/imageonline/52.jpeg",
      53: "Stages/PuzzleSet50/imageonline/53.jpeg",
      54: "Stages/PuzzleSet50/imageonline/54.jpeg",
      55: "Stages/PuzzleSet50/imageonline/55.jpeg",
      56: "Stages/PuzzleSet50/imageonline/56.jpeg",
      57: "Stages/PuzzleSet50/imageonline/57.jpeg",
      58: "Stages/PuzzleSet50/imageonline/58.jpeg",
      59: "Stages/PuzzleSet50/imageonline/59.jpeg",
      60: "Stages/PuzzleSet50/imageonline/60.jpeg",
      61: "Stages/PuzzleSet50/imageonline/61.jpeg",
      62: "Stages/PuzzleSet50/imageonline/62.jpeg",
      63: "Stages/PuzzleSet50/imageonline/63.jpeg",
      64: "Stages/PuzzleSet50/imageonline/64.jpeg",
    },
    // STAGE : 51 -(5X5)
    {
      1: "Stages/PuzzleSet51/imageonline/1.jpeg",
      2: "Stages/PuzzleSet51/imageonline/2.jpeg",
      3: "Stages/PuzzleSet51/imageonline/3.jpeg",
      4: "Stages/PuzzleSet51/imageonline/4.jpeg",
      5: "Stages/PuzzleSet51/imageonline/5.jpeg",
      6: "Stages/PuzzleSet51/imageonline/6.jpeg",
      7: "Stages/PuzzleSet51/imageonline/7.jpeg",
      8: "Stages/PuzzleSet51/imageonline/8.jpeg",
      9: "Stages/PuzzleSet51/imageonline/9.jpeg",

      10: "Stages/PuzzleSet51/imageonline/10.jpeg",
      11: "Stages/PuzzleSet51/imageonline/11.jpeg",
      12: "Stages/PuzzleSet51/imageonline/12.jpeg",
      13: "Stages/PuzzleSet51/imageonline/13.jpeg",
      14: "Stages/PuzzleSet51/imageonline/14.jpeg",
      15: "Stages/PuzzleSet51/imageonline/15.jpeg",
      16: "Stages/PuzzleSet51/imageonline/16.jpeg",

      17: "Stages/PuzzleSet51/imageonline/17.jpeg",
      18: "Stages/PuzzleSet51/imageonline/18.jpeg",
      19: "Stages/PuzzleSet51/imageonline/19.jpeg",
      20: "Stages/PuzzleSet51/imageonline/20.jpeg",
      21: "Stages/PuzzleSet51/imageonline/21.jpeg",
      22: "Stages/PuzzleSet51/imageonline/22.jpeg",
      23: "Stages/PuzzleSet51/imageonline/23.jpeg",
      24: "Stages/PuzzleSet51/imageonline/24.jpeg",
      25: "Stages/PuzzleSet51/imageonline/25.jpeg",
    },
    // STAGE : 52 -(6X6)
    {
      1: "Stages/PuzzleSet52/imageonline/1.jpeg",
      2: "Stages/PuzzleSet52/imageonline/2.jpeg",
      3: "Stages/PuzzleSet52/imageonline/3.jpeg",
      4: "Stages/PuzzleSet52/imageonline/4.jpeg",
      5: "Stages/PuzzleSet52/imageonline/5.jpeg",
      6: "Stages/PuzzleSet52/imageonline/6.jpeg",
      7: "Stages/PuzzleSet52/imageonline/7.jpeg",
      8: "Stages/PuzzleSet52/imageonline/8.jpeg",
      9: "Stages/PuzzleSet52/imageonline/9.jpeg",

      10: "Stages/PuzzleSet52/imageonline/10.jpeg",
      11: "Stages/PuzzleSet52/imageonline/11.jpeg",
      12: "Stages/PuzzleSet52/imageonline/12.jpeg",
      13: "Stages/PuzzleSet52/imageonline/13.jpeg",
      14: "Stages/PuzzleSet52/imageonline/14.jpeg",
      15: "Stages/PuzzleSet52/imageonline/15.jpeg",
      16: "Stages/PuzzleSet52/imageonline/16.jpeg",

      17: "Stages/PuzzleSet52/imageonline/17.jpeg",
      18: "Stages/PuzzleSet52/imageonline/18.jpeg",
      19: "Stages/PuzzleSet52/imageonline/19.jpeg",
      20: "Stages/PuzzleSet52/imageonline/20.jpeg",
      21: "Stages/PuzzleSet52/imageonline/21.jpeg",
      22: "Stages/PuzzleSet52/imageonline/22.jpeg",
      23: "Stages/PuzzleSet52/imageonline/23.jpeg",
      24: "Stages/PuzzleSet52/imageonline/24.jpeg",
      25: "Stages/PuzzleSet52/imageonline/25.jpeg",

      26: "Stages/PuzzleSet52/imageonline/26.jpeg",
      27: "Stages/PuzzleSet52/imageonline/27.jpeg",
      28: "Stages/PuzzleSet52/imageonline/28.jpeg",
      29: "Stages/PuzzleSet52/imageonline/29.jpeg",
      30: "Stages/PuzzleSet52/imageonline/30.jpeg",
      31: "Stages/PuzzleSet52/imageonline/31.jpeg",
      32: "Stages/PuzzleSet52/imageonline/32.jpeg",
      33: "Stages/PuzzleSet52/imageonline/33.jpeg",
      34: "Stages/PuzzleSet52/imageonline/34.jpeg",
      35: "Stages/PuzzleSet52/imageonline/35.jpeg",
      36: "Stages/PuzzleSet52/imageonline/36.jpeg",
    },
    // STAGE : 53 -(6X6)
    {
      1: "Stages/PuzzleSet53/imageonline/1.jpeg",
      2: "Stages/PuzzleSet53/imageonline/2.jpeg",
      3: "Stages/PuzzleSet53/imageonline/3.jpeg",
      4: "Stages/PuzzleSet53/imageonline/4.jpeg",
      5: "Stages/PuzzleSet53/imageonline/5.jpeg",
      6: "Stages/PuzzleSet53/imageonline/6.jpeg",
      7: "Stages/PuzzleSet53/imageonline/7.jpeg",
      8: "Stages/PuzzleSet53/imageonline/8.jpeg",
      9: "Stages/PuzzleSet53/imageonline/9.jpeg",

      10: "Stages/PuzzleSet53/imageonline/10.jpeg",
      11: "Stages/PuzzleSet53/imageonline/11.jpeg",
      12: "Stages/PuzzleSet53/imageonline/12.jpeg",
      13: "Stages/PuzzleSet53/imageonline/13.jpeg",
      14: "Stages/PuzzleSet53/imageonline/14.jpeg",
      15: "Stages/PuzzleSet53/imageonline/15.jpeg",
      16: "Stages/PuzzleSet53/imageonline/16.jpeg",

      17: "Stages/PuzzleSet53/imageonline/17.jpeg",
      18: "Stages/PuzzleSet53/imageonline/18.jpeg",
      19: "Stages/PuzzleSet53/imageonline/19.jpeg",
      20: "Stages/PuzzleSet53/imageonline/20.jpeg",
      21: "Stages/PuzzleSet53/imageonline/21.jpeg",
      22: "Stages/PuzzleSet53/imageonline/22.jpeg",
      23: "Stages/PuzzleSet53/imageonline/23.jpeg",
      24: "Stages/PuzzleSet53/imageonline/24.jpeg",
      25: "Stages/PuzzleSet53/imageonline/25.jpeg",

      26: "Stages/PuzzleSet53/imageonline/26.jpeg",
      27: "Stages/PuzzleSet53/imageonline/27.jpeg",
      28: "Stages/PuzzleSet53/imageonline/28.jpeg",
      29: "Stages/PuzzleSet53/imageonline/29.jpeg",
      30: "Stages/PuzzleSet53/imageonline/30.jpeg",
      31: "Stages/PuzzleSet53/imageonline/31.jpeg",
      32: "Stages/PuzzleSet53/imageonline/32.jpeg",
      33: "Stages/PuzzleSet53/imageonline/33.jpeg",
      34: "Stages/PuzzleSet53/imageonline/34.jpeg",
      35: "Stages/PuzzleSet53/imageonline/35.jpeg",
      36: "Stages/PuzzleSet53/imageonline/36.jpeg",
    },
    // STAGE : 54 - (7X7)
    {
      1: "Stages/PuzzleSet54/imageonline/1.png",
      2: "Stages/PuzzleSet54/imageonline/2.png",
      3: "Stages/PuzzleSet54/imageonline/3.png",
      4: "Stages/PuzzleSet54/imageonline/4.png",
      5: "Stages/PuzzleSet54/imageonline/5.png",
      6: "Stages/PuzzleSet54/imageonline/6.png",
      7: "Stages/PuzzleSet54/imageonline/7.png",
      8: "Stages/PuzzleSet54/imageonline/8.png",
      9: "Stages/PuzzleSet54/imageonline/9.png",

      10: "Stages/PuzzleSet54/imageonline/10.png",
      11: "Stages/PuzzleSet54/imageonline/11.png",
      12: "Stages/PuzzleSet54/imageonline/12.png",
      13: "Stages/PuzzleSet54/imageonline/13.png",
      14: "Stages/PuzzleSet54/imageonline/14.png",
      15: "Stages/PuzzleSet54/imageonline/15.png",
      16: "Stages/PuzzleSet54/imageonline/16.png",

      17: "Stages/PuzzleSet54/imageonline/17.png",
      18: "Stages/PuzzleSet54/imageonline/18.png",
      19: "Stages/PuzzleSet54/imageonline/19.png",
      20: "Stages/PuzzleSet54/imageonline/20.png",
      21: "Stages/PuzzleSet54/imageonline/21.png",
      22: "Stages/PuzzleSet54/imageonline/22.png",
      23: "Stages/PuzzleSet54/imageonline/23.png",
      24: "Stages/PuzzleSet54/imageonline/24.png",
      25: "Stages/PuzzleSet54/imageonline/25.png",

      26: "Stages/PuzzleSet54/imageonline/26.png",
      27: "Stages/PuzzleSet54/imageonline/27.png",
      28: "Stages/PuzzleSet54/imageonline/28.png",
      29: "Stages/PuzzleSet54/imageonline/29.png",
      30: "Stages/PuzzleSet54/imageonline/30.png",
      31: "Stages/PuzzleSet54/imageonline/31.png",
      32: "Stages/PuzzleSet54/imageonline/32.png",
      33: "Stages/PuzzleSet54/imageonline/33.png",
      34: "Stages/PuzzleSet54/imageonline/34.png",
      35: "Stages/PuzzleSet54/imageonline/35.png",
      36: "Stages/PuzzleSet54/imageonline/36.png",

      37: "Stages/PuzzleSet54/imageonline/37.png",
      38: "Stages/PuzzleSet54/imageonline/38.png",
      39: "Stages/PuzzleSet54/imageonline/39.png",
      40: "Stages/PuzzleSet54/imageonline/40.png",
      41: "Stages/PuzzleSet54/imageonline/41.png",
      42: "Stages/PuzzleSet54/imageonline/42.png",
      43: "Stages/PuzzleSet54/imageonline/43.png",
      44: "Stages/PuzzleSet54/imageonline/44.png",
      45: "Stages/PuzzleSet54/imageonline/45.png",
      46: "Stages/PuzzleSet54/imageonline/46.png",
      47: "Stages/PuzzleSet54/imageonline/47.png",
      48: "Stages/PuzzleSet54/imageonline/48.png",
      49: "Stages/PuzzleSet54/imageonline/49.png",
    },
    // STAGE : 55 - (7X7)
    {
      1: "Stages/PuzzleSet55/imageonline/1.jpeg",
      2: "Stages/PuzzleSet55/imageonline/2.jpeg",
      3: "Stages/PuzzleSet55/imageonline/3.jpeg",
      4: "Stages/PuzzleSet55/imageonline/4.jpeg",
      5: "Stages/PuzzleSet55/imageonline/5.jpeg",
      6: "Stages/PuzzleSet55/imageonline/6.jpeg",
      7: "Stages/PuzzleSet55/imageonline/7.jpeg",
      8: "Stages/PuzzleSet55/imageonline/8.jpeg",
      9: "Stages/PuzzleSet55/imageonline/9.jpeg",

      10: "Stages/PuzzleSet55/imageonline/10.jpeg",
      11: "Stages/PuzzleSet55/imageonline/11.jpeg",
      12: "Stages/PuzzleSet55/imageonline/12.jpeg",
      13: "Stages/PuzzleSet55/imageonline/13.jpeg",
      14: "Stages/PuzzleSet55/imageonline/14.jpeg",
      15: "Stages/PuzzleSet55/imageonline/15.jpeg",
      16: "Stages/PuzzleSet55/imageonline/16.jpeg",

      17: "Stages/PuzzleSet55/imageonline/17.jpeg",
      18: "Stages/PuzzleSet55/imageonline/18.jpeg",
      19: "Stages/PuzzleSet55/imageonline/19.jpeg",
      20: "Stages/PuzzleSet55/imageonline/20.jpeg",
      21: "Stages/PuzzleSet55/imageonline/21.jpeg",
      22: "Stages/PuzzleSet55/imageonline/22.jpeg",
      23: "Stages/PuzzleSet55/imageonline/23.jpeg",
      24: "Stages/PuzzleSet55/imageonline/24.jpeg",
      25: "Stages/PuzzleSet55/imageonline/25.jpeg",

      26: "Stages/PuzzleSet55/imageonline/26.jpeg",
      27: "Stages/PuzzleSet55/imageonline/27.jpeg",
      28: "Stages/PuzzleSet55/imageonline/28.jpeg",
      29: "Stages/PuzzleSet55/imageonline/29.jpeg",
      30: "Stages/PuzzleSet55/imageonline/30.jpeg",
      31: "Stages/PuzzleSet55/imageonline/31.jpeg",
      32: "Stages/PuzzleSet55/imageonline/32.jpeg",
      33: "Stages/PuzzleSet55/imageonline/33.jpeg",
      34: "Stages/PuzzleSet55/imageonline/34.jpeg",
      35: "Stages/PuzzleSet55/imageonline/35.jpeg",
      36: "Stages/PuzzleSet55/imageonline/36.jpeg",

      37: "Stages/PuzzleSet55/imageonline/37.jpeg",
      38: "Stages/PuzzleSet55/imageonline/38.jpeg",
      39: "Stages/PuzzleSet55/imageonline/39.jpeg",
      40: "Stages/PuzzleSet55/imageonline/40.jpeg",
      41: "Stages/PuzzleSet55/imageonline/41.jpeg",
      42: "Stages/PuzzleSet55/imageonline/42.jpeg",
      43: "Stages/PuzzleSet55/imageonline/43.jpeg",
      44: "Stages/PuzzleSet55/imageonline/44.jpeg",
      45: "Stages/PuzzleSet55/imageonline/45.jpeg",
      46: "Stages/PuzzleSet55/imageonline/46.jpeg",
      47: "Stages/PuzzleSet55/imageonline/47.jpeg",
      48: "Stages/PuzzleSet55/imageonline/48.jpeg",
      49: "Stages/PuzzleSet55/imageonline/49.jpeg",
    },
    // STAGE : 56 - (7X7)
    {
      1: "Stages/PuzzleSet56/imageonline/1.jpeg",
      2: "Stages/PuzzleSet56/imageonline/2.jpeg",
      3: "Stages/PuzzleSet56/imageonline/3.jpeg",
      4: "Stages/PuzzleSet56/imageonline/4.jpeg",
      5: "Stages/PuzzleSet56/imageonline/5.jpeg",
      6: "Stages/PuzzleSet56/imageonline/6.jpeg",
      7: "Stages/PuzzleSet56/imageonline/7.jpeg",
      8: "Stages/PuzzleSet56/imageonline/8.jpeg",
      9: "Stages/PuzzleSet56/imageonline/9.jpeg",

      10: "Stages/PuzzleSet56/imageonline/10.jpeg",
      11: "Stages/PuzzleSet56/imageonline/11.jpeg",
      12: "Stages/PuzzleSet56/imageonline/12.jpeg",
      13: "Stages/PuzzleSet56/imageonline/13.jpeg",
      14: "Stages/PuzzleSet56/imageonline/14.jpeg",
      15: "Stages/PuzzleSet56/imageonline/15.jpeg",
      16: "Stages/PuzzleSet56/imageonline/16.jpeg",

      17: "Stages/PuzzleSet56/imageonline/17.jpeg",
      18: "Stages/PuzzleSet56/imageonline/18.jpeg",
      19: "Stages/PuzzleSet56/imageonline/19.jpeg",
      20: "Stages/PuzzleSet56/imageonline/20.jpeg",
      21: "Stages/PuzzleSet56/imageonline/21.jpeg",
      22: "Stages/PuzzleSet56/imageonline/22.jpeg",
      23: "Stages/PuzzleSet56/imageonline/23.jpeg",
      24: "Stages/PuzzleSet56/imageonline/24.jpeg",
      25: "Stages/PuzzleSet56/imageonline/25.jpeg",

      26: "Stages/PuzzleSet56/imageonline/26.jpeg",
      27: "Stages/PuzzleSet56/imageonline/27.jpeg",
      28: "Stages/PuzzleSet56/imageonline/28.jpeg",
      29: "Stages/PuzzleSet56/imageonline/29.jpeg",
      30: "Stages/PuzzleSet56/imageonline/30.jpeg",
      31: "Stages/PuzzleSet56/imageonline/31.jpeg",
      32: "Stages/PuzzleSet56/imageonline/32.jpeg",
      33: "Stages/PuzzleSet56/imageonline/33.jpeg",
      34: "Stages/PuzzleSet56/imageonline/34.jpeg",
      35: "Stages/PuzzleSet56/imageonline/35.jpeg",
      36: "Stages/PuzzleSet56/imageonline/36.jpeg",

      37: "Stages/PuzzleSet56/imageonline/37.jpeg",
      38: "Stages/PuzzleSet56/imageonline/38.jpeg",
      39: "Stages/PuzzleSet56/imageonline/39.jpeg",
      40: "Stages/PuzzleSet56/imageonline/40.jpeg",
      41: "Stages/PuzzleSet56/imageonline/41.jpeg",
      42: "Stages/PuzzleSet56/imageonline/42.jpeg",
      43: "Stages/PuzzleSet56/imageonline/43.jpeg",
      44: "Stages/PuzzleSet56/imageonline/44.jpeg",
      45: "Stages/PuzzleSet56/imageonline/45.jpeg",
      46: "Stages/PuzzleSet56/imageonline/46.jpeg",
      47: "Stages/PuzzleSet56/imageonline/47.jpeg",
      48: "Stages/PuzzleSet56/imageonline/48.jpeg",
      49: "Stages/PuzzleSet56/imageonline/49.jpeg",
    },
    // STAGE : 57 -(8X8)
    {
      1: "Stages/PuzzleSet57/imageonline/1.jpeg",
      2: "Stages/PuzzleSet57/imageonline/2.jpeg",
      3: "Stages/PuzzleSet57/imageonline/3.jpeg",
      4: "Stages/PuzzleSet57/imageonline/4.jpeg",
      5: "Stages/PuzzleSet57/imageonline/5.jpeg",
      6: "Stages/PuzzleSet57/imageonline/6.jpeg",
      7: "Stages/PuzzleSet57/imageonline/7.jpeg",
      8: "Stages/PuzzleSet57/imageonline/8.jpeg",
      9: "Stages/PuzzleSet57/imageonline/9.jpeg",

      10: "Stages/PuzzleSet57/imageonline/10.jpeg",
      11: "Stages/PuzzleSet57/imageonline/11.jpeg",
      12: "Stages/PuzzleSet57/imageonline/12.jpeg",
      13: "Stages/PuzzleSet57/imageonline/13.jpeg",
      14: "Stages/PuzzleSet57/imageonline/14.jpeg",
      15: "Stages/PuzzleSet57/imageonline/15.jpeg",
      16: "Stages/PuzzleSet57/imageonline/16.jpeg",

      17: "Stages/PuzzleSet57/imageonline/17.jpeg",
      18: "Stages/PuzzleSet57/imageonline/18.jpeg",
      19: "Stages/PuzzleSet57/imageonline/19.jpeg",
      20: "Stages/PuzzleSet57/imageonline/20.jpeg",
      21: "Stages/PuzzleSet57/imageonline/21.jpeg",
      22: "Stages/PuzzleSet57/imageonline/22.jpeg",
      23: "Stages/PuzzleSet57/imageonline/23.jpeg",
      24: "Stages/PuzzleSet57/imageonline/24.jpeg",
      25: "Stages/PuzzleSet57/imageonline/25.jpeg",

      26: "Stages/PuzzleSet57/imageonline/26.jpeg",
      27: "Stages/PuzzleSet57/imageonline/27.jpeg",
      28: "Stages/PuzzleSet57/imageonline/28.jpeg",
      29: "Stages/PuzzleSet57/imageonline/29.jpeg",
      30: "Stages/PuzzleSet57/imageonline/30.jpeg",
      31: "Stages/PuzzleSet57/imageonline/31.jpeg",
      32: "Stages/PuzzleSet57/imageonline/32.jpeg",
      33: "Stages/PuzzleSet57/imageonline/33.jpeg",
      34: "Stages/PuzzleSet57/imageonline/34.jpeg",
      35: "Stages/PuzzleSet57/imageonline/35.jpeg",
      36: "Stages/PuzzleSet57/imageonline/36.jpeg",

      37: "Stages/PuzzleSet57/imageonline/37.jpeg",
      38: "Stages/PuzzleSet57/imageonline/38.jpeg",
      39: "Stages/PuzzleSet57/imageonline/39.jpeg",
      40: "Stages/PuzzleSet57/imageonline/40.jpeg",
      41: "Stages/PuzzleSet57/imageonline/41.jpeg",
      42: "Stages/PuzzleSet57/imageonline/42.jpeg",
      43: "Stages/PuzzleSet57/imageonline/43.jpeg",
      44: "Stages/PuzzleSet57/imageonline/44.jpeg",
      45: "Stages/PuzzleSet57/imageonline/45.jpeg",
      46: "Stages/PuzzleSet57/imageonline/46.jpeg",
      47: "Stages/PuzzleSet57/imageonline/47.jpeg",
      48: "Stages/PuzzleSet57/imageonline/48.jpeg",
      49: "Stages/PuzzleSet57/imageonline/49.jpeg",

      50: "Stages/PuzzleSet57/imageonline/50.jpeg",
      51: "Stages/PuzzleSet57/imageonline/51.jpeg",
      52: "Stages/PuzzleSet57/imageonline/52.jpeg",
      53: "Stages/PuzzleSet57/imageonline/53.jpeg",
      54: "Stages/PuzzleSet57/imageonline/54.jpeg",
      55: "Stages/PuzzleSet57/imageonline/55.jpeg",
      56: "Stages/PuzzleSet57/imageonline/56.jpeg",
      57: "Stages/PuzzleSet57/imageonline/57.jpeg",
      58: "Stages/PuzzleSet57/imageonline/58.jpeg",
      59: "Stages/PuzzleSet57/imageonline/59.jpeg",
      60: "Stages/PuzzleSet57/imageonline/60.jpeg",
      61: "Stages/PuzzleSet57/imageonline/61.jpeg",
      62: "Stages/PuzzleSet57/imageonline/62.jpeg",
      63: "Stages/PuzzleSet57/imageonline/63.jpeg",
      64: "Stages/PuzzleSet57/imageonline/64.jpeg",
    },
    // STAGE : 58 -(8X8)
    {
      1: "Stages/PuzzleSet58/imageonline/1.jpeg",
      2: "Stages/PuzzleSet58/imageonline/2.jpeg",
      3: "Stages/PuzzleSet58/imageonline/3.jpeg",
      4: "Stages/PuzzleSet58/imageonline/4.jpeg",
      5: "Stages/PuzzleSet58/imageonline/5.jpeg",
      6: "Stages/PuzzleSet58/imageonline/6.jpeg",
      7: "Stages/PuzzleSet58/imageonline/7.jpeg",
      8: "Stages/PuzzleSet58/imageonline/8.jpeg",
      9: "Stages/PuzzleSet58/imageonline/9.jpeg",

      10: "Stages/PuzzleSet58/imageonline/10.jpeg",
      11: "Stages/PuzzleSet58/imageonline/11.jpeg",
      12: "Stages/PuzzleSet58/imageonline/12.jpeg",
      13: "Stages/PuzzleSet58/imageonline/13.jpeg",
      14: "Stages/PuzzleSet58/imageonline/14.jpeg",
      15: "Stages/PuzzleSet58/imageonline/15.jpeg",
      16: "Stages/PuzzleSet58/imageonline/16.jpeg",

      17: "Stages/PuzzleSet58/imageonline/17.jpeg",
      18: "Stages/PuzzleSet58/imageonline/18.jpeg",
      19: "Stages/PuzzleSet58/imageonline/19.jpeg",
      20: "Stages/PuzzleSet58/imageonline/20.jpeg",
      21: "Stages/PuzzleSet58/imageonline/21.jpeg",
      22: "Stages/PuzzleSet58/imageonline/22.jpeg",
      23: "Stages/PuzzleSet58/imageonline/23.jpeg",
      24: "Stages/PuzzleSet58/imageonline/24.jpeg",
      25: "Stages/PuzzleSet58/imageonline/25.jpeg",

      26: "Stages/PuzzleSet58/imageonline/26.jpeg",
      27: "Stages/PuzzleSet58/imageonline/27.jpeg",
      28: "Stages/PuzzleSet58/imageonline/28.jpeg",
      29: "Stages/PuzzleSet58/imageonline/29.jpeg",
      30: "Stages/PuzzleSet58/imageonline/30.jpeg",
      31: "Stages/PuzzleSet58/imageonline/31.jpeg",
      32: "Stages/PuzzleSet58/imageonline/32.jpeg",
      33: "Stages/PuzzleSet58/imageonline/33.jpeg",
      34: "Stages/PuzzleSet58/imageonline/34.jpeg",
      35: "Stages/PuzzleSet58/imageonline/35.jpeg",
      36: "Stages/PuzzleSet58/imageonline/36.jpeg",

      37: "Stages/PuzzleSet58/imageonline/37.jpeg",
      38: "Stages/PuzzleSet58/imageonline/38.jpeg",
      39: "Stages/PuzzleSet58/imageonline/39.jpeg",
      40: "Stages/PuzzleSet58/imageonline/40.jpeg",
      41: "Stages/PuzzleSet58/imageonline/41.jpeg",
      42: "Stages/PuzzleSet58/imageonline/42.jpeg",
      43: "Stages/PuzzleSet58/imageonline/43.jpeg",
      44: "Stages/PuzzleSet58/imageonline/44.jpeg",
      45: "Stages/PuzzleSet58/imageonline/45.jpeg",
      46: "Stages/PuzzleSet58/imageonline/46.jpeg",
      47: "Stages/PuzzleSet58/imageonline/47.jpeg",
      48: "Stages/PuzzleSet58/imageonline/48.jpeg",
      49: "Stages/PuzzleSet58/imageonline/49.jpeg",

      50: "Stages/PuzzleSet58/imageonline/50.jpeg",
      51: "Stages/PuzzleSet58/imageonline/51.jpeg",
      52: "Stages/PuzzleSet58/imageonline/52.jpeg",
      53: "Stages/PuzzleSet58/imageonline/53.jpeg",
      54: "Stages/PuzzleSet58/imageonline/54.jpeg",
      55: "Stages/PuzzleSet58/imageonline/55.jpeg",
      56: "Stages/PuzzleSet58/imageonline/56.jpeg",
      57: "Stages/PuzzleSet58/imageonline/57.jpeg",
      58: "Stages/PuzzleSet58/imageonline/58.jpeg",
      59: "Stages/PuzzleSet58/imageonline/59.jpeg",
      60: "Stages/PuzzleSet58/imageonline/60.jpeg",
      61: "Stages/PuzzleSet58/imageonline/61.jpeg",
      62: "Stages/PuzzleSet58/imageonline/62.jpeg",
      63: "Stages/PuzzleSet58/imageonline/63.jpeg",
      64: "Stages/PuzzleSet58/imageonline/64.jpeg",
    },
    // STAGE : 59 -(8X8)
    {
      1: "Stages/PuzzleSet59/imageonline/1.jpeg",
      2: "Stages/PuzzleSet59/imageonline/2.jpeg",
      3: "Stages/PuzzleSet59/imageonline/3.jpeg",
      4: "Stages/PuzzleSet59/imageonline/4.jpeg",
      5: "Stages/PuzzleSet59/imageonline/5.jpeg",
      6: "Stages/PuzzleSet59/imageonline/6.jpeg",
      7: "Stages/PuzzleSet59/imageonline/7.jpeg",
      8: "Stages/PuzzleSet59/imageonline/8.jpeg",
      9: "Stages/PuzzleSet59/imageonline/9.jpeg",

      10: "Stages/PuzzleSet59/imageonline/10.jpeg",
      11: "Stages/PuzzleSet59/imageonline/11.jpeg",
      12: "Stages/PuzzleSet59/imageonline/12.jpeg",
      13: "Stages/PuzzleSet59/imageonline/13.jpeg",
      14: "Stages/PuzzleSet59/imageonline/14.jpeg",
      15: "Stages/PuzzleSet59/imageonline/15.jpeg",
      16: "Stages/PuzzleSet59/imageonline/16.jpeg",

      17: "Stages/PuzzleSet59/imageonline/17.jpeg",
      18: "Stages/PuzzleSet59/imageonline/18.jpeg",
      19: "Stages/PuzzleSet59/imageonline/19.jpeg",
      20: "Stages/PuzzleSet59/imageonline/20.jpeg",
      21: "Stages/PuzzleSet59/imageonline/21.jpeg",
      22: "Stages/PuzzleSet59/imageonline/22.jpeg",
      23: "Stages/PuzzleSet59/imageonline/23.jpeg",
      24: "Stages/PuzzleSet59/imageonline/24.jpeg",
      25: "Stages/PuzzleSet59/imageonline/25.jpeg",

      26: "Stages/PuzzleSet59/imageonline/26.jpeg",
      27: "Stages/PuzzleSet59/imageonline/27.jpeg",
      28: "Stages/PuzzleSet59/imageonline/28.jpeg",
      29: "Stages/PuzzleSet59/imageonline/29.jpeg",
      30: "Stages/PuzzleSet59/imageonline/30.jpeg",
      31: "Stages/PuzzleSet59/imageonline/31.jpeg",
      32: "Stages/PuzzleSet59/imageonline/32.jpeg",
      33: "Stages/PuzzleSet59/imageonline/33.jpeg",
      34: "Stages/PuzzleSet59/imageonline/34.jpeg",
      35: "Stages/PuzzleSet59/imageonline/35.jpeg",
      36: "Stages/PuzzleSet59/imageonline/36.jpeg",

      37: "Stages/PuzzleSet59/imageonline/37.jpeg",
      38: "Stages/PuzzleSet59/imageonline/38.jpeg",
      39: "Stages/PuzzleSet59/imageonline/39.jpeg",
      40: "Stages/PuzzleSet59/imageonline/40.jpeg",
      41: "Stages/PuzzleSet59/imageonline/41.jpeg",
      42: "Stages/PuzzleSet59/imageonline/42.jpeg",
      43: "Stages/PuzzleSet59/imageonline/43.jpeg",
      44: "Stages/PuzzleSet59/imageonline/44.jpeg",
      45: "Stages/PuzzleSet59/imageonline/45.jpeg",
      46: "Stages/PuzzleSet59/imageonline/46.jpeg",
      47: "Stages/PuzzleSet59/imageonline/47.jpeg",
      48: "Stages/PuzzleSet59/imageonline/48.jpeg",
      49: "Stages/PuzzleSet59/imageonline/49.jpeg",

      50: "Stages/PuzzleSet59/imageonline/50.jpeg",
      51: "Stages/PuzzleSet59/imageonline/51.jpeg",
      52: "Stages/PuzzleSet59/imageonline/52.jpeg",
      53: "Stages/PuzzleSet59/imageonline/53.jpeg",
      54: "Stages/PuzzleSet59/imageonline/54.jpeg",
      55: "Stages/PuzzleSet59/imageonline/55.jpeg",
      56: "Stages/PuzzleSet59/imageonline/56.jpeg",
      57: "Stages/PuzzleSet59/imageonline/57.jpeg",
      58: "Stages/PuzzleSet59/imageonline/58.jpeg",
      59: "Stages/PuzzleSet59/imageonline/59.jpeg",
      60: "Stages/PuzzleSet59/imageonline/60.jpeg",
      61: "Stages/PuzzleSet59/imageonline/61.jpeg",
      62: "Stages/PuzzleSet59/imageonline/62.jpeg",
      63: "Stages/PuzzleSet59/imageonline/63.jpeg",
      64: "Stages/PuzzleSet59/imageonline/64.jpeg",
    },
    // repeat more stages as needed
  ];

  const FullImages = [
    "Assets/Img/Stages/PuzzleSet1/fullImage.png",
    "Assets/Img/Stages/PuzzleSet2/fullImage.png",
    "Assets/Img/Stages/PuzzleSet3/fullImage.png",
    "Assets/Img/Stages/PuzzleSet4/fullImage.png",
    "Assets/Img/Stages/PuzzleSet5/fullImage.png",
    "Assets/Img/Stages/PuzzleSet6/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet7/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet8/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet9/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet10/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet11/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet12/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet13/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet14/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet15/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet16/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet17/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet18/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet19/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet20/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet21/fullImage.png",
    "Assets/Img/Stages/PuzzleSet22/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet23/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet24/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet25/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet26/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet27/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet28/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet29/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet30/fullImage.jpg",
    "Assets/Img/Stages/PuzzleSet31/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet32/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet33/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet34/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet35/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet36/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet37/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet38/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet39/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet40/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet41/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet42/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet43/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet44/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet45/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet46/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet47/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet48/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet49/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet50/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet51/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet52/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet53/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet54/fullImage.png",
    "Assets/Img/Stages/PuzzleSet55/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet56/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet57/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet58/fullImage.jpeg",
    "Assets/Img/Stages/PuzzleSet59/fullImage.jpeg",
  ];

  const StageBGImages = [
    // BG - 1
    `./Assets/Img/BG/BG1.jpg`,
    // BG - 2
    `./Assets/Img/BG/BG2.jpg`,
    // BG - 3
    `./Assets/Img/BG/BG3.jpg`,
    // BG - 4
    `./Assets/Img/BG/BG4.jpg`,
    // BG - 5
    `./Assets/Img/BG/BG5.jpg`,
    // BG - 6
    `./Assets/Img/BG/BG6.jpg`,
    // BG - 7
    `./Assets/Img/BG/BG7.jpg`,
    // BG - 8
    `./Assets/Img/BG/BG8.jpg`,
    // BG - 9
    `./Assets/Img/BG/BG9.jpg`,
    // BG - 10
    `./Assets/Img/BG/BG10.jpg`,
    // BG - 11
    `./Assets/Img/BG/BG11.jpg`,
    // BG - 12
    `./Assets/Img/BG/BG12.jpg`,
    // BG - 13
    `./Assets/Img/BG/BG13.jpg`,
    // BG - 14
    `./Assets/Img/BG/BG14.jpg`,
    // BG - 15
    `./Assets/Img/BG/BG15.jpg`,
    // BG - 16
    `./Assets/Img/BG/BG16.jpg`,
    // BG - 17
    `./Assets/Img/BG/BG17.jpg`,
    // BG - 18
    `./Assets/Img/BG/BG18.jpeg`,
    // BG - 19
    `./Assets/Img/BG/BG19.jpeg`,
    // BG - 20
    `./Assets/Img/BG/BG20.jpeg`,
    // BG - 21
    `./Assets/Img/BG/BG21.jpg`,
    // BG - 22
    `./Assets/Img/BG/BG22.jpg`,
    // BG - 23
    `./Assets/Img/BG/BG23.jpg`,
    // BG - 24
    `./Assets/Img/BG/BG24.jpg`,
    // BG - 25
    `./Assets/Img/BG/BG25.jpg`,
    // BG - 26
    `./Assets/Img/BG/BG26.jpg`,
    // BG - 27
    `./Assets/Img/BG/BG27.jpg`,
    // BG - 28
    `./Assets/Img/BG/BG28.jpg`,
    // BG - 29
    `./Assets/Img/BG/BG29.jpg`,
    // BG - 30
    `./Assets/Img/BG/BG30.jpg`,
    // BG - 31
    `./Assets/Img/BG/BG31.jpg`,
    // BG - 32
    `./Assets/Img/BG/BG32.jpg`,
    // BG - 33
    `./Assets/Img/BG/BG33.jpg`,
    // BG - 34
    `./Assets/Img/BG/BG34.jpg`,
    // BG - 35
    `./Assets/Img/BG/BG35.jpg`,
    // BG - 36
    `./Assets/Img/BG/BG36.jpg`,
    // BG - 37
    `./Assets/Img/BG/BG37.jpg`,
    // BG - 38
    `./Assets/Img/BG/BG38.jpg`,
    // BG - 39
    `./Assets/Img/BG/BG39.jpg`,
    // BG - 40
    `./Assets/Img/BG/BG40.jpg`,
    // BG - 41
    `./Assets/Img/BG/BG41.jpg`,
    // BG - 42
    `./Assets/Img/BG/BG42.jpg`,
    // BG - 43
    `./Assets/Img/BG/BG43.jpg`,
    // BG - 44
    `./Assets/Img/BG/BG44.jpg`,
    // BG - 45
    `./Assets/Img/BG/BG45.jpg`,
    // BG - 46
    `./Assets/Img/BG/BG46.jpg`,
    // BG - 47
    `./Assets/Img/BG/BG47.jpg`,
    // BG - 48
    `./Assets/Img/BG/BG48.jpg`,
    // BG - 49
    `./Assets/Img/BG/BG49.jpg`,
    // BG - 50
    `./Assets/Img/BG/BG50.jpg`,
    // BG - 51
    `./Assets/Img/BG/BG51.jpg`,
    // BG - 52
    `./Assets/Img/BG/BG52.jpg`,
    // BG - 53
    `./Assets/Img/BG/BG53.jpg`,
    // BG - 54
    `./Assets/Img/BG/BG54.jpg`,
    // BG - 55
    `./Assets/Img/BG/BG55.jpg`,
    // BG - 56
    `./Assets/Img/BG/BG56.jpg`,
    // BG - 57
    `./Assets/Img/BG/BG57.jpg`,
    // BG - 58
    `./Assets/Img/BG/BG58.jpg`,
    // BG - 59
    `./Assets/Img/BG/BG59.jpg`,
  ];

  const cards = document.querySelectorAll(".card img");

  cards.forEach((img, index) => {
    img.src = FullImages[index];
  });

  // Initialize MOST IMPORTANT TO START GAME CLASS -------------------------------
  const game = new PuzzleGame(STAGES);

  // Global functions for buttons************************************************

  // STAGE OPEN-PLAY FUNCTION----------------------------------
  function STAGEFUNCTION(cardElement) {
    game.loadStage(cardElement);
  }

  const stageCards = document.querySelectorAll(".card");

  stageCards.forEach((card) => {
    card.addEventListener("click", () => {
      STAGEFUNCTION(card);
    });
  });

  // GAME PLAY NOTICE FUNCTION PLAY OR EXIT STAGE ----------------------------------------------
  function GameFunction() {
    game.startStage();
  }
  function exitFunction() {
    game.exitStage();
  }

  const playBtn = document.querySelector(".playGameBtn");
  const exitBtn = document.querySelector(".exitGameBtn");

  if (playBtn) {
    playBtn.addEventListener("click", GameFunction);
  }

  if (exitBtn) {
    exitBtn.addEventListener("click", exitFunction);
  }
  // =================================
  function nextStageOpen() {
    const nextStage = game.currentStage + 1; // Increment the current stage
    const buttons = document.querySelectorAll(".card");

    const nextButton = buttons[nextStage - 1]; // Get the next button based on the stage
    console.log("Next stage:", nextStage);
    console.log("Total stages:", game.stages.length);

    if (nextButton) {
      nextButton.classList.add("open");
      localStorage.setItem("unlockedStage", nextStage);

      // If there's a next stage, ask if the player wants to continue
      if (nextStage <= game.stages.length) {
        console.log("Stage is not the last one.");
        if (
          confirm(
            "🎉 Stage complete! Do you want to continue to the next stage?"
          )
        ) {
          game.loadStage(nextButton);
        }
      } else {
        // All stages are complete
        console.log("All stages completed!");
        alert("🎉 All stages completed!");
      }
    } else {
      console.log("No next button found.");
    }
  }

  // INSIDE STAGES MOVE STAGE AHEAD OR BACK--------------------------------------------
  function stagePageMoveFunction(num) {
    const cards = Array.from(document.querySelectorAll(".card"));
    const openCards = cards.filter((card) => card.classList.contains("open"));

    const currentIndex = openCards.findIndex(
      (card) => parseInt(card.dataset.numberAccess, 10) === game.currentStage
    );

    const nextIndex = currentIndex + num;

    if (nextIndex >= 0 && nextIndex < openCards.length) {
      const nextCard = openCards[nextIndex];
      game.loadStage(nextCard);
      document.querySelector(".DORPIMG").innerHTML = "";
    } else {
      alert(
        num === -1 ? "🚫 No previous stage." : "🚫 No next unlocked stage."
      );
    }
  }

  const moveLeftBtn = document.querySelector(".stage-move-left");
  const moveRightBtn = document.querySelector(".stage-move-right");

  if (moveLeftBtn) {
    moveLeftBtn.addEventListener("click", () => stagePageMoveFunction(-1));
  }

  if (moveRightBtn) {
    moveRightBtn.addEventListener("click", () => stagePageMoveFunction(1));
  }

  // RETURN TO HOME PAGE FUNCTION----------------------------------------------
  function homePageFunction() {
    if (confirm("🏠 Return to Home Page?")) {
      game.exitStage(); // This already resets puzzle, stage UI, etc.

      // If you want to manually clear any extra elements, do it carefully:
      const DORPIMG = document.querySelector(".DORPIMG");
      if (DORPIMG) {
        DORPIMG.innerHTML = "";
      }
    }
  }
  const homeButton = document.querySelector(".homePageBtn");

  if (homeButton) {
    homeButton.addEventListener("click", homePageFunction);
  }

  // RESTART PUZZLE PICES-------------------------------------------------------
  function restartStage() {
    if (!game.currentStage) return;

    const confirmReset = confirm("🔄 Do you want to restart this stage?");
    if (confirmReset) {
      const stageImages = game.stages[game.currentStage - 1];
      game.renderPuzzle(stageImages);
    }
  }

  const restartBtn = document.querySelector(".restartStageBtn");

  if (restartBtn) {
    restartBtn.addEventListener("click", restartStage);
  }

  // VISIBLE FUNCTION TO FULL SCREEN SETTINGS-----------------------------------------
  function toggleVisibility(selector, show = true) {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.toggle("visible", show);
      console.log(element);
    } else {
      console.warn(`Element ${selector} not found!`);
    }
  }

  // Function to show full screen image view
  function fullScreenImageView() {
    toggleVisibility(".fullScreenSection", true);
  }

  // Function to close full screen image view
  function closeFullScreenFunction() {
    toggleVisibility(".fullScreenSection", false);
  }

  // Function to show full screen setting view
  function fullScreenSettingView() {
    toggleVisibility(".settingSection", true);
  }

  // Function to close full screen setting view
  function fullScreenSettingViewClose() {
    toggleVisibility(".settingSection", false);
  }

  const fullImageSection = document.querySelector(".fullImageHeres");
  // Event listener for the full image view section
  if (fullImageSection) {
    fullImageSection.addEventListener("click", fullScreenImageView);
  }

  const SettingOpenICON = document.querySelectorAll(".SettingOpen");
  SettingOpenICON.forEach((button) => {
    button.addEventListener("click", fullScreenSettingView);
  });

  const closeFullScreenBtns = document.querySelectorAll(
    ".closeFullScreenButton"
  );
  // Event listener for close buttons
  closeFullScreenBtns.forEach((button) => {
    button.addEventListener("click", closeFullScreenFunction);
  });

  const SettingViewClose = document.querySelectorAll(
    ".fullScreenSettingViewClose"
  );
  // Event listener for close buttons
  SettingViewClose.forEach((button) => {
    button.addEventListener("click", fullScreenSettingViewClose);
  });
});

