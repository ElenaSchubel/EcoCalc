export default [{
    title: 'waste',
    expanded: false,
    items: [{
      calcMoney(current) {
        return current * 2.50
      },

      calcTime() {
        return 0
      },

      calcEnviroImpact(current) {
        return current
      },


      title: 'rubbish bags',
      questionPrefix: "How many ",
      questionSuffix: " do you fill per week?",
      whatIfPrefix: "What if you used a different number of ",
      whatIfSuffix: " per week ...",

      options: [{
          title: '0',
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
          title: '5',
          value: 5
        },
      ],
      current: null,
      baseline: null
    }]
  },
  {
    title: 'heating',
    expanded: false,

    items: [{
        title: 'heat pump',
        questionPrefix: "How much do you use a ",
        questionSuffix: "?",

        calcMoney(current) {
          return current * 7
        },

        calcTime() {
          return 0
        },

        calcEnviroImpact(current) {
          return current
        },

        options: [{
            title: 'never',
            value: 0
          },
          {
            title: 'occasionally',
            value: 0.25
          },
          {
            title: 'sometimes',
            value: 0.5
          },
          {
            title: 'lots',
            value: 1
          }
        ],
        current: null,
        baseline: null
      },
      {
        title: 'blankets',
        questionPrefix: "How about ",
        questionSuffix: "?",

        calcMoney(current) {
          return current * 7
        },

        calcTime() {
          return 0
        },

        calcEnviroImpact(current) {
          return current
        },

        options: [{
            title: 'never',
            value: 0
          },
          {
            title: 'occasionally',
            value: 0.25
          },
          {
            title: 'sometimes',
            value: 0.5
          },
          {
            title: 'lots',
            value: 1
          }
        ],
        current: null,
        baseline: null
      },

      {
        title: 'wood fire',
        questionPrefix: "How about a ",
        questionSuffix: "?",

        calcMoney(current) {
          return current * 7
        },

        calcTime() {
          return 0
        },

        calcEnviroImpact(current) {
          return current
        },

        options: [{
            title: 'never',
            value: 0
          },
          {
            title: 'occasionally',
            value: 0.25
          },
          {
            title: 'sometimes',
            value: 0.5
          },
          {
            title: 'lots',
            value: 1
          }
        ],
        current: null,
        baseline: null
      },
      {
        title: 'bar heater',
        questionPrefix: "How about a ",
        questionSuffix: "?",

        calcMoney(current) {
          return current * 7
        },

        calcTime() {
          return 0
        },

        calcEnviroImpact(current) {
          return current
        },

        options: [{
            title: 'never',
            value: 0
          },
          {
            title: 'occasionally',
            value: 0.25
          },
          {
            title: 'sometimes',
            value: 0.5
          },
          {
            title: 'lots',
            value: 1
          }
        ],
        current: null,
        baseline: null
      }
    ]

  },

  {
    title: 'Transport',
    expanded: false,

    items: [{
      title: 'walking or biking',
      questionPrefix: "How often do you get to work by ",
      questionSuffix: "?",

			calcMoney(current) {
				return current
			},

			calcTime() {
				return 0
			},

			calcEnviroImpact(current) {
				return current
			},
			options: [{
            title: 'never',
            value: 0
          },
          {
            title: 'occasionally',
            value: 0.25
          },
          {
            title: 'sometimes',
            value: 0.5
          },
          {
            title: 'lots',
            value: 1
          }
        ],
        current: null,
        baseline: null
      },
      {
        title: 'public transport',
        questionPrefix: "How about using ",
        questionSuffix: "?",
				calcMoney(current) {
					return current
				},

				calcTime() {
					return 0
				},

				calcEnviroImpact(current) {
					return current
				},
        options: [{
            title: 'never',
            value: 0
          },
          {
            title: 'occasionally',
            value: 0.25
          },
          {
            title: 'sometimes',
            value: 0.5
          },
          {
            title: 'lots',
            value: 1
          }
        ],
        current: null,
        baseline: null
      },
      {
        title: 'car',
        questionPrefix: "How about by ",
        questionSuffix: "?",
				calcMoney(current) {
					return current
				},

				calcTime() {
					return 0
				},

				calcEnviroImpact(current) {
					return current
				},
        options: [{
            title: 'never',
            value: 0
          },
          {
            title: 'occasionally',
            value: 0.25
          },
          {
            title: 'sometimes',
            value: 0.5
          },
          {
            title: 'lots',
            value: 1
          }
        ],
        current: null,
        baseline: null
      }
    ]



}]
