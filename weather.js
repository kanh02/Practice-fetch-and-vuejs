var app = new Vue({
	el: '#app',
	data: {
		city: {},
		one: '',
		cityname: '',
		tempmmin: '',
		tempmmax: '',
		max: '',
		min: '',
		weat: '',
		mensaje: '',
		selected: '',
		humy: '',
		options: [
			{
				city: 'Madrid',
				text: 'Cocido Madrileño'
			},
			{
				city: 'London',
				image: '',
				text: 'Fish and Chips'
			},
			{
				city: 'Paris',
				image: '',
				text: 'Soupe a L Oignon'
			},
			{
				city: 'Porto',
				image: '',
				text: 'Francesinhas'
			},
			{
				city: 'Rome',
				image: '',
				text: 'Gnocchi'
			},
			{
				city: 'Athens',
				image: '',
				text: 'Tzatziki'
			},
			{
				city: 'Berlin',
				image: '',
				text: 'Eisbein'
			},
			{
				city: 'Vienna',
				image: '',
				text: 'Wiener Schnitzel'
			},
			{
				city: 'Moscow',
				image: '',
				text: 'Borsch'
			},
			{
				city: 'Helsinki',
				image: '',
				text: 'Kalakukko'
			}

			   ]

	},
	created: function () {
//		this.getCity()

	},
	methods: {


		getCity: function () {

			var url = "https://api.openweathermap.org/data/2.5/forecast?q=";
			var city = "London";
			var key = "&APPID=541d06d219cbd104c02d1777edb4561b";


			this.one = document.formulario.cities.value;
			console.log(this.one)

			city = this.one;

			



			fetch(url + city + key, {
				method: "GET",

			}).then(function (response) {
				if (response.ok) {
					return response.json();
				}
				throw new Error(response.statusText);
			}).then(function (json) {
				var data = json;
				app.city = data;
				console.log(app.city)
				
				app.cityname = data.city.name;

				app.humy = data.list[0].main.humidity;

				app.tempmmax = data.list[0].main.temp_max;
				app.tempmmin = data.list[0].main.temp_min;

				app.grades(app.tempmmax);
				app.grades(app.tempmmin);
				
				app.max = app.grades(app.tempmmax);
				app.min = app.grades(app.tempmmin);

				app.weather(app.max);
				app.mensaje = app.weather(app.max);


			}).catch(function (error) {
				console.log("Request failed: " + error.message);
			})
		},

		grades: function (array) {

			var kel = -273.15;
			var tempfinal = array + kel;
			var temp = tempfinal.toFixed();
			return (temp)

		},

		weather: function (array) {

			var mesage1 = "temperature is sunny";
			var mesage2 = "temperature is cold";
			var vacio = "";
			if (array > 15) {
				vacio = mesage1;
			} else if (array < 15) {
				vacio = mesage2;
			}

			return (vacio)
		}
	}

})

//541d06d219cbd104c02d1777edb4561b
