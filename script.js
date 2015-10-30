$(function () {

    // Give the points a 3D feel by adding a radial gradient
    Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.4,
                cy: 0.3,
                r: 0.5
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
            ]
        };
    });

    // Set up the chart
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            margin: 100,
            type: 'scatter',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 0,
                depth: 250,
                viewDistance: 1000,

                frame: {
                    bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                    back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                    side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                }
            }
        },
        title: {
            text: 'Draggable box'
        },
        subtitle: {
            text: 'Click and drag the plot area to rotate in space'
        },
        plotOptions: {
            scatter: {
                width: 20,
                height: 20,
                depth: 20
            }
        },
        yAxis: { //0, 495
            min: 0,
            max: 495,
            title: null,
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent', 
            labels: {
       			enabled: false
   			},
   			minorTickLength: 0,
   			tickLength: 0
        },
        xAxis: { //0, 846
            min: 0,
            max: 864,
            gridLineWidth: 1, 
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent', 
            labels: {
       			enabled: false
   			},
   			minorTickLength: 0,
   			tickLength: 0
        },
        zAxis: { //-220, 222
            min: -220,
            max: 222,
            showFirstLabel: false, 
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent', 
            labels: {
       			enabled: false
   			},
   			minorTickLength: 0,
   			tickLength: 0
        },
        tooltip: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Reading',
            colorByPoint: false,
            data: [[437,0,0], [479, 50.4, 42], [280, 56.4, -47], [358, 86.4, 76], [414, 93.6, -80], [250, 93.6, 82], [230, 117.6, -104], [332, 121.2, 108], [437, 122.4, -110], [490, 124.8, 112], [542, 124.8, -112], [207, 147.6, 134], [566, 154.8, -137], [362, 156, 142], [308, 163.2, -145], [186, 169.2, 153], [290, 172.8, -154], [440, 183.6, 164], [589, 183.6, 164], [386, 184.8, 166], [492, 187.2, -166], [185, 194.4, 173], [271, 195.6, -172], [596, 202.8, 179], [406, 206.4, -180], [775, 211.2, 184], [826, 211.2, -184], [516, 214.8, 186], [202, 217.2, -187], [251, 220.8, 190], [596, 228, -192], [541, 244.8, 200], [227, 247.2, -202], [441, 248.4, 202], [371, 250.8, -204], [740, 270, 212], [708, 270, -211], [674, 270, 212], [645, 270, -211], [598, 270, 212], [570, 270, -211], [204, 276, 214], [464, 276, -213], [365, 284.4, 216], [272, 297, -216], [785, 300, 219], [179, 306, -218], [488, 307.2, 220], [596, 309.6, -218], [388, 310, 221], [809, 330, -220], [512, 334.8, 222], [596, 337, -220], [145, 339.6, 222], [112, 339.6, -220], [84, 339.6, 222], [56, 339.6, -220], [28, 339.6, 222], [0, 339.6, 222], [412, 339.6, 222], [535, 361.2, -220], [434, 363.6, 222], [846, 364, -220], [340, 373.8, 222], [560, 375.6, -219], [145, 382.2, 220], [450, 383.4, -218], [586, 391.8, 218], [375, 392.4, -217], [414, 401.4, 215], [450, 402, -214], [500, 402, 215], [614, 408.6, -212], [145, 415.8, 211], [641, 424.2, 0], [450, 425.4, -206], [668, 439.8, 200], [450, 447.6, 20], [145, 451.2, -21], [450, 470.4, 167], [737, 481.8, -160], [145, 486.6, 61], [450, 490, -67], [189, 495, 90], [241, 495, -90], [297, 495, 130], [350, 495, -130], [405, 495, 111]]
        }]
    });


    // Add mouse events for rotation
    $(chart.container).bind('mousedown.hc touchstart.hc', function (eStart) {
        eStart = chart.pointer.normalize(eStart);

        var posX = eStart.pageX,
            posY = eStart.pageY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            newAlpha,
            newBeta,
            sensitivity = 1; // lower is more sensitive

        $(document).bind({
            'mousemove.hc touchdrag.hc': function (e) {
                // Run beta
                newBeta = beta + (posX - e.pageX) / sensitivity;
                chart.options.chart.options3d.beta = newBeta;

                // Run alpha
                newAlpha = alpha + (e.pageY - posY) / sensitivity;
                //chart.options.chart.options3d.alpha = newAlpha;

                chart.redraw(false);
            },
            'mouseup touchend': function () {
                $(document).unbind('.hc');
            }
        });

        

        
    });
    var oldbeta = 0;
    $("#btn").click(function(){
            newBeta = oldbeta + 90;
            oldbeta = newBeta;
            chart.options.chart.options3d.beta = newBeta;
            chart.redraw(true);
        });
});
