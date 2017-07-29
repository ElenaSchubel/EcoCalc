export default
[
	{
      title: 'waste',
      items: [{
      	title: 'rubbish bags',

      	calcMoney(current) {
      		return current * 2.50
      	},

      	calcTime() {
      		return 0
      	},

      	calcEnviroImpact(current){
      		return current
      	},
      	

        
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
        current: 0
      }]
    },

    {
      title: 'heating',

      items: [{
      	title: 'heat pump',

      	calcMoney(current) {
      		return current * 7
      	},

      	calcTime() {
      		return 0
      	},

      	calcEnviroImpact(current){
      		return current
      	},
      	
        options: 
        [{
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
        current: 0
      },
      {
      	title: 'blankets',

      	calcMoney(current) {
      		return current * 7
      	},

      	calcTime() {
      		return 0
      	},

      	calcEnviroImpact(current){
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
        current: 0
      },

      {
      	title: 'wood',

      	calcMoney(current) {
      		return current * 7
      	},

      	calcTime() {
      		return 0
      	},

      	calcEnviroImpact(current){
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
        current: 0
      },
      {
      	title: 'bar heater',

      	calcMoney(current) {
      		return current * 7
      	},

      	calcTime() {
      		return 0
      	},

      	calcEnviroImpact(current){
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
        current: 0
      }]

    },


    {
      title: 'transport',

      items: [{
      	title: 'walking',

      	calcMoney(current) {
      		return current * 7
      	},

      	calcTime() {
      		return 0
      	},

      	calcEnviroImpact(current){
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
        current: 0
      }],

    }

]