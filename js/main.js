document.addEventListener("DOMContentLoaded", function () {
  let sliderContainer = document.querySelector(".slider-container");
  let slider = document.querySelector(".slider");

  let initialX = null;
  let initialScrollY = window.scrollY + 500;
  let middleY = window.innerHeight / 2;

  window.addEventListener("scroll", function () {
    if (initialX === null) {
      initialX = slider.getBoundingClientRect().left + window.scrollX;
    }

    let scrollY = window.scrollY + 500;

    let offsetX = (scrollY - initialScrollY) * 1;

    slider.style.transform = `translateX(${initialX - offsetX}px)`;
  });
});

function togglemenu() {
  const navbar = document.querySelector(".navbar-mobile");
  const burger = document.querySelector(".burger");
  burger.addEventListener("click", () => {
    navbar.classList.toggle("show-nav");
  });
}
togglemenu();


const ctx1 = document.getElementById("chart2");

const chart2 = new Chart(ctx1, {
  type: "polarArea",
  data: {
    datasets: [
      {
        data: myData1["chiffres"],
        backgroundColor: [
          "rgb(92,203,123,0.5)",
          "rgb(191,239,211,0.5)",
          "rgb(83,156,103,0.5)  ",
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
    labels: myData1["annees"],
  },
  options: {
    maintainAspectRatio: false,
    animation: {
      duration: 3000,
      easing: "easeOutQuad",
    },
    plugins: {
      title: {
        display: true,
        text: "Impact de l'installation de dispositifs hydro-économes",
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += context.formattedValue + " kWh";
            return label;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 20,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
        borderColor: "rgba(0, 0, 0, 0.5)",
      },
      arc: {
        borderWidth: 0,
      },
    },
    scales: {
      r: {
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 18,
          },
        },
        ticks: {
          stepSize: 50,
          callback: function (value) {
            return value + " kWh";
          },
        },
      },
    },
  },
});

const ctx2 = document.getElementById("chart3");

const chart3 = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: myData2.annees,
    datasets: [
      {
        data: myData2.chiffres,
        label: "chiffres",
        backgroundColor: ["#EB983A", "#FFCD4F", "#5CCB7B"],
      },
    ],
  },
  options: {
    borderRadius: 30,
    maintainAspectRatio: false,
    animation: {
      duration: 3000,
      easing: "easeOutQuad",
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "gCO2e/kWh",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Evolution de la production de CO2",
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += context.formattedValue + " kWh";
            return label;
          },
        },
      },
    },
  },
});

const autocolors = window["chartjs-plugin-autocolors"];
const ctx = document.getElementById("chart");

let delayed;
const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: classeLogement,
    datasets: [
      {
        data: data[0].chiffres,
        label: data[0].catégorie,
        backgroundColor: "#FFCD4F",
      },
      {
        data: data[1].chiffres,
        label: data[1].catégorie,
        backgroundColor: "#EB983A",
      },
      {
        data: data[2].chiffres,
        label: data[2].catégorie,
        backgroundColor: "#E34F26",
      },
      {
        data: data[3].chiffres,
        label: data[3].catégorie,
        backgroundColor: "#5CCB7B",
      },
    ],
  },
  options: {
    borderRadius: 10,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 200 + context.datasetIndex * 2000;
        }
        return delay;
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          sampleSize: 3,
        },
      },
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Energie de chauffage par classe des logements en % en 2022",
        font: {
          size: 16, 
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  },
});

const ctx3 = document.getElementById("chart1");

const chart1 = new Chart(ctx3, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: data2.proportions,
        backgroundColor: [
          "#55637F",
          "#9DA6D2",
          "#5CCB7B",
          "#FFCD4F",
          "#FFAE58",
          "#E34F26",
          "#D2D2D2",
        ],
      },
    ],

    labels: data2.catégories,
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    /* datasets:{
        pie: {
            radius: 180,
            spacing: 1
        }
    }, */

    plugins: {
      title: {
        display: true,
        text: "Production énergétique en France en 2022",
        font: {
          size: 18,
        },
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: "easeInOutQuart",
      delay: 3000,
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  var ctx4 = document.getElementById("myChart").getContext("2d");
  var years = ["2022", "2030", "À terme"];
  var percentages = [20.7, 33, 100];

  var myChart = new Chart(ctx4, {
    type: "bar",
    data: {
      labels: years,
      datasets: [
        {
          label: "Production d'Énergie Renouvelable en France (%)",
          data: percentages,
          backgroundColor: ["#6ADC8B", "#5AD87E", "#41D36A"],
          borderColor: ["#E4E4E4", "#E4E4E4", "#E4E4E4"],
          borderWidth: 2,
          borderRadius: {
            topLeft: 10,
            topRight: 10,
          },
          hoverBackgroundColor: ["#49D471", "#39D064", "#E34F26"],
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
      elements: {
        line: {
          borderWidth: 0,
        },
        point: {
          radius: 0,
        },
      },
      maintainAspectRatio: false,
      plugins: {
        deferred: {
          xOffset: 150, // defer until 150px of the canvas width are inside the viewport
          yOffset: "90%", // defer until 50% of the canvas height are inside the viewport
          delay: 200, // delay of 500 ms after the canvas is considered inside the viewport
        },
        legend: {
          display: false,
        },
      },
    },
  });
});

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3250,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
