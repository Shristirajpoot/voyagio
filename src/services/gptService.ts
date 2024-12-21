import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateItinerary = async (data: { destination: string; date: string; length: string; group: string; budget: string; activity: string }) => {
  // Input validation
  if (!data.destination || !data.date || !data.length || !data.group || !data.budget || !data.activity) {
    return null;
  }

  // Construct prompt for GPT API
  const prompt = `You are an expert traveller and backpacker who has seen the world and know every destination's ins and outs. Create a ${data.length}-day itinerary for a ${data.group} trip to ${data.destination} with a budget of: ${data.budget}, starting on: ${data.date}. Plan 5 programs for each day in the following category(s): ${data.activity}. Return the requested data according to the specified details in the form of a json object with the following outline/format. Only return the requested json and nothing else, no matter what! Make sure to watch out for the types too. Here comes the format:
  {"destination": {"numberOfDays": Number,"destinationCity": String,"destinationCountry": String,"currency": String,"oneDollarInLocalCurrency": Number,"languagesSpoken": Array,"timeThereInUtcFormat": String // eg. UTC + 2,"capitalOfTheCountry": String, "localWeather": String // eg. monsoon or continental or etc, "temperatureRangeThroughTheYear": String,"shortDescription": String // 2-3 sentances, "shortHistory": String // 2-3 sentances,"startDate": String,"endDate": String},"itinerary":[{"day": number, "date": String // eg. dayoftheweek day month, "program": [{"id": Number // continue with the next number on the next day,"programOrPlaceName": String, "timeSpentThere": String, "location": String, coordinateOfEvent: [lng: number // longtitude as 5 decimals, lat: number // latitude as 5 decimals] // array like [lng, lat], "shortDescriptionOfProgram": String // 2-3 sentances}, // ... Repeat for each program]}, // ... Repeat for each day], "estimatedCosts": [{"category": Accommodation, "hostelCostPerNight": Number, "hotelCostPerNight": Number,"luxuryHotelCostPerNight": Number,"airbnbCostPerNight": Number}, {"category": "Transportation","busCost": Number,"taxiCost": Number,"trainCost": Number,"rentalCost": Number},{"category": Food,"streetFoodCost": Number,"budgetRestaurantCost": Number,"fancyRestaurantCost": Number,"traditionalFoodCost": Number}, {"category": Activities, "mainActivityForEachDay": [{"mainActivityName": String,"costOfProgram": Number}, // ... Repeat for each day's main event and cost of program should be in usd]}]}`;
/*hi user*/
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo-1106", // Model in use
      messages: [{role: "system", content: "You are a travel planning assistant."}, {role: "user", content: prompt}],
      response_format: { type: "json_object" },
      max_tokens: 4090,
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    // Extracting and parsing the content from the response
    const contentString = response.data.choices[0].message.content;

    // If response is a string parse it into json, if it's json return normally
    if (typeof contentString === 'string') {
      const parsedContent = JSON.parse(contentString);
      return parsedContent;
  } else {
      return contentString;
  }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error calling OpenAI API:', error.message);
      if (error.response) {
        console.error(error.response.data);
      }
    } else {
      console.error('An unexpected error occurred:', error);
    }
    return null;
  }
};
