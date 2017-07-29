export default [{
    title: 'waste',
    expanded: false,
    items: [
      {
        title: 'rubbish bags',
        questionPrefix: "How many ",
        questionSuffix: " do you fill per week?",
        whatIfPrefix: "What if you used a different number of ",
        whatIfSuffix: " per week ...",

        moneyMultiplier: 2.5,
        moneyMultiplierDesc: " per council rubbish bag",

        calcMoney(current) {
          return current * 2.50
        },

        calcTimeSeconds(current) {
          return current * 300
        },

        calcWasteKg(current) {
          return current * 6.25
        },

        calcCo2(current) {
          return 0
        },

        options: [{
            title: '0',
            value: 0
          },
          {
            title: '1/4',
            value: 0.25
          },
          {
            title: '1/2',
            value: 0.5
          },
          {
            title: '3/4',
            value: 0.75
          },
          {
            title: '1',
            value: 1
          },
          {
            title: '2+',
            value: 2
          },
        ],
        current: null,
        baseline: null
      },
      {
        title: 'recycling bags',
        questionPrefix: "How many ",
        questionSuffix: " do you fill per week?",
        whatIfPrefix: "What if you used a different number of ",
        whatIfSuffix: " per week ...",

        calcMoney() {
          return 0
        },

        calcTimeSeconds(current) {
          return current * 300
        },

        calcWasteKg(current) {
          // return current * 5
          return 0
        },

        calcCo2(current) {
          return 0
        },

        options: [{
            title: '0',
            value: 0
          },
          {
            title: '1/4',
            value: 0.25
          },
          {
            title: '1/2',
            value: 0.5
          },
          {
            title: '3/4',
            value: 0.75
          },
          {
            title: '1',
            value: 1
          },
          {
            title: '2+',
            value: 2
          },
        ],
        current: null,
        baseline: null
      },
      {
        title: 'soft plastic',
        questionPrefix: "How much of your ",
        questionSuffix: " do you recycle?",
        whatIfPrefix: "What if you recycled a different amount of ",
        whatIfSuffix: "?",

        calcMoney() {
          return 0
        },

        calcTimeSeconds(current) {
          return current * 3
        },

        calcWasteKg(current) {
          // return current * 0.18 / 100
          return 0
        },

        calcCo2(current) {
          return 0
        },

        options: [{
            title: '0',
            value: 0
          },
          {
            title: '1/4',
            value: 25
          },
          {
            title: '1/2',
            value: 50
          },
          {
            title: '3/4',
            value: 75
          },
          {
            title: 'all',
            value: 100
          }
        ],
        current: null,
        baseline: null
      },
      {
        title: 'organic waste',
        questionPrefix: "How many ",
        questionSuffix: " do you fill per week?",
        whatIfPrefix: "What if you used a different number of ",
        whatIfSuffix: " per week ...",

        calcMoney() {
          return 0
        },

        calcTimeSeconds(current) {
          return current * 3
        },

        calcWasteKg(current) {
          // return current * 0.66 / 100
          return 0
        },

        calcCo2(current) {
          return 0
        },

        options: [{
            title: '0',
            value: 0
          },
          {
            title: '1/4',
            value: 25
          },
          {
            title: '1/2',
            value: 50
          },
          {
            title: '3/4',
            value: 75
          },
          {
            title: 'all',
            value: 100
          }
        ],
        current: null,
        baseline: null
      },
    ]
  },

  {
    title: 'Transport',
    expanded: false,

    items: [{
      title: 'walking or biking',
      questionPrefix: "How much ",
      questionSuffix: " do you do per day?",

			calcMoney() {
				return 0
			},

			calcTimeSeconds(km) {
				return km * 720
      },

      calcCo2() {
        return 0
      },

			calcWasteKg() {
        return 0
      },

			options: [
          {
            title: '~1km',
            value: 1
          },
          {
            title: '~3km',
            value: 3
          },
          {
            title: '~5km',
            value: 5
          },
          {
            title: '~7km',
            value: 7
          },
          {
            title: '10+km',
            value: 10
          }
        ],
        current: null,
        baseline: null
      },
      {
        title: 'bus or train',
        questionPrefix: "How many ",
        questionSuffix: " trips per day?",

				calcMoney(trips) {
					return trips * 5 * 7
				},

				calcTimeSeconds(trips) {
					return 80 * 10 * trips * 7
        },

        calcCo2(trips) {
          return 18.1 * 10 * trips * 7
        },

				calcWasteKg(current) {
          return 0
        },

        options: [{
            title: 'none',
            value: 0
          },
          {
            title: '1',
            value: 1
          },
          {
            title: '2',
            value: 2
          },
          {
            title: '3',
            value: 3
          },
          {
            title: '4',
            value: 4
          },
          {
            title: '5+',
            value: 5
          }
        ],
        current: null,
        baseline: null
      },
      {
        title: 'car',
        questionPrefix: "How far do you go by ",
        questionSuffix: "?",
				calcMoney(km) {
					return km * 0.3 * 7
				},

				calcTimeSeconds(km) {
					return km * 72 * 7
        },

        calcCo2(km) {
          return 198.71 * km * 7
        },

				calcWasteKg(current) {
          return 0
        },

        options: [{
            title: 'nowhere',
            value: 0
          },
          {
            title: '10km',
            value: 10
          },
          {
            title: '20km',
            value: 20
          },
          {
            title: '30km',
            value: 30
          },
          {
            title: '40+km',
            value: 40
          }
        ],
        current: null,
        baseline: null
      }
    ]
  },
  {
    title: 'heating',
    expanded: false,

    items: [{
        title: 'heat pump',
        questionPrefix: "How many hours do you use a ",
        questionSuffix: " per day?",

        calcMoney(hours) {
          return hours * 0.27 * 7
        },

        calcTimeSeconds() {
          return 0
        },

        calcCo2(hours) {
          return 141.55 * hours * 7
        },

        calcWasteKg(current) {
          return 0
        },

        options: [
          {
            title: '0',
            value: 0
          },
          {
            title: '2',
            value: 2
          },
          {
            title: '4',
            value: 4
          },
          {
            title: '6',
            value: 6
          },
          {
            title: '8',
            value: 8
          },
          {
            title: '10+',
            value: 10
          }
        ],
        current: null,
        baseline: null
      },
      {
        title: 'bar heater',
        questionPrefix: "How about ",
        questionSuffix: "?",

        calcMoney(hours) {
          return hours * 0.6 * 7
        },

        calcTimeSeconds() {
          return 0
        },

        calcCo2(hours) {
          return 314.56 * hours * 7
        },

        calcWasteKg(current) {
          return 0
        },

        options: [
          {
            title: '0',
            value: 0
          },
          {
            title: '2',
            value: 2
          },
          {
            title: '4',
            value: 4
          },
          {
            title: '6',
            value: 6
          },
          {
            title: '8',
            value: 8
          },
          {
            title: '10+',
            value: 10
          }
        ],
        current: null,
        baseline: null
      },

      {
        title: 'wood fire',
        questionPrefix: "How about a ",
        questionSuffix: "?",

        calcMoney(hours) {
          return hours * 0.28 * 7
        },

        calcTimeSeconds() {
          return 0
        },

        calcCo2(hours) {
          return 200 * hours * 7
        },

        calcWasteKg(current) {
          return 0
        },

        options: [
          {
            title: '0',
            value: 0
          },
          {
            title: '2',
            value: 2
          },
          {
            title: '4',
            value: 4
          },
          {
            title: '6',
            value: 6
          },
          {
            title: '8',
            value: 8
          },
          {
            title: '10+',
            value: 10
          }
        ],
        current: null,
        baseline: null
      },
      {
        title: 'blankets',
        questionPrefix: "How about a ",
        questionSuffix: "?",

        calcMoney() {
          return 0
        },

        calcTimeSeconds() {
          return 0
        },

        calcCo2() {
          return 0
        },

        calcWasteKg(current) {
          return 0
        },

        options: [
          {
            title: '0',
            value: 0
          },
          {
            title: '2',
            value: 2
          },
          {
            title: '4',
            value: 4
          },
          {
            title: '6',
            value: 6
          },
          {
            title: '8',
            value: 8
          },
          {
            title: '10+',
            value: 10
          }
        ],
        current: null,
        baseline: null
      }
    ]
  }
]
