// Creating function for Data plotting (Bar, gauge)
function getPlot(id) {
    // getting data from the json file
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)
    
        // filter sample values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        // Getting the top 10 
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        // get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
        // get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);
  
       // create the Traces
       var trace1 = {
        x: samples.samplesvalues,
        y: OTU_id,
        type: "bar",
        name: "Sample Values",
        orientation: "h",
        };

        // Create the data array for the plot
        var data1 = [trace1];

        // Define the plot layout
        var layout1 = {
        title: "Top 10 OTU",
        yaxis: { 
            tickmode: "linear",
        },
        margin: {
        l: 80,
        r: 80,
        t: 80,
        b: 40
        }
        };

        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bar", data1, layout1);

        var trace2 = {

        x: samples.otu_ids,   
        y: samples.samples_values,
        mode: "markers",
        marker: { size: data.samples_values,
            color: samples.otu_ids
        },
        text: samples.otu_labels
        };

        // Create the data array for the plot
        var data2 = [trace2];

        // Define the plot layout
        var layout2 = {
        xaxis: {title: "OTU ID"},
        height:700,
        width: 900,
        };

        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bubble", data2, layout2);
        
      });
  }  
// create the function to get the necessary data
function getInfo(id) {
    // read the json file to get data
    d3.json("Data/samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();