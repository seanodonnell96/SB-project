import React from 'react';
import { AppRegistry, Image} from 'react-native';
import { StyleSheet, SectionList, ScrollView, Button, Alert, Text, TextInput, View } from 'react-native';
import {StackNavigator, DrawerNavigator, TabNavigator, DrawerItems } from 'react-navigation';

//Launcher used so that it is possible to access other drawers
class Launcher extends React.Component {
  render() {
    return (
      <Text>Luke, I am your launcher</Text>
    )
  }
}

/*
* The following screens are the specific screens used in each drawer
* All of these screens call on the GenericScreen to display their info
*/
class TopStoriesScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Top Stories',
  };

  render() {
    return (
      <GenericScreen screenProps={title="top-stories"}/>
    );
  }
}

class BusinessScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Business',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/business"}/>
    )
  }
}

class EducationScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Education',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/education"}/>
    )
  }
}

class FinanceScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Finance',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/finance"}/>
    )
  }
}

class FoodBevScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Food & Beverage',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/food+&+beverage"}/>
    )
  }
}

class HealthCareScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Health Care',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/health+care"}/>
    )
  }
}

class MarketAdvertScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Marketing & Advertising',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/marketing+&+advertising"}/>
    )
  }
}

class RetailScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Retail',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/retail"}/>
    )
  }
}

class LifeSciencesScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Life Sciences & Technology',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/life+sciences+&+technology"}/>
    )
  }
}

class TelecomScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Telecom',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/telecom"}/>
    )
  }
}

class InfrastructureScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Infrastructure',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/infrastructure"}/>
    )
  }
}

class EnergyChemicalsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Energy & Chemicals',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/energy+&+chemicals"}/>
    )
  }
}

class AviationAerospaceScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Aviation & Aerospace',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/aviation+&+aerospace"}/>
    )
  }
}


class TravelHospitalityScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Travel & Hospitality',
  };
  render() {
    return (
      <GenericScreen screenProps={title="industry/travel+&+hospitality"}/>
    )
  }
}

/* GenericScreen
*  A generic screen that each of the specific screens use to display data
*  fetches the stories for each selection
*     Then inserts each individual story into the stories array
*/
class GenericScreen extends React.Component {
  state = {
  	stories: [
				{ headline: "",
    		  summary: "",
    		  date: "",
          image_url: "" },
		],
  };
  newStory = (storyInfo) => {
  	this.setState(prevState => ({
    	stories: storyInfo
    }))
  };
  fetchData = () => {
    var _this = this;
  fetch(`http://www.smartbrief.com/endpoint/${this.props.screenProps}`)
      .then(function(response){
        return response.json();

      })
      .then(function(data) { 
      	  _this.newStory(data);
    })
  }
  render() {
    this.fetchData();
    return (
        <StoryList  stories={this.state.stories}/>
    )
  }
}

//displays the information for each story: the headline, the date and the summary
const Story = (props) => {
  if (props.image_url.length) {
    	return (
  <View style={styles.outerStyle}> 
    <View style={{flexDirection: 'row', flex: 1,}}>      
       
  	    <Text style={styles.headerStyle}>{props.headline}</Text> 
        <Image source={{uri: props.image_url}} style={styles.imageStyle} />
    </View>
      <Text style={styles.summaryStyle}>{props.summary}</Text>
  </View>
  )
  } else {
	return (
  <View style={styles.outerStyle}>       
  	  <Text style={styles.headerStyle}>{props.headline}</Text>
      <Text style={styles.summaryStyle}>{props.summary}</Text>
  </View>
  )
  }

};

//creates a list of all of the stories
const StoryList = (props) => {
	return(
    <View>
  	  <ScrollView>{props.stories.map((story, index)=><Story key={index} {...story} />)}</ScrollView>
    </View>
  )
}

const Application =  DrawerNavigator({
/* Application consists of a Drawer Navigator, which will allow for the sidebar menu that is found in the app
*   Each selection in the sidebar has its own entry in the drawer
*     These entries are a Stack Navgator, to allow the user to travel back and forth between screens easily
*
* (launcher is simply there to aid in development, will not be in final build.) 
*/
    launcher: { screen: Launcher },
    TopStories: {screen: StackNavigator({ 
        BaseTopStoriesScreen: {screen: TopStoriesScreen} })},
    Business: {screen: StackNavigator({ 
        BaseBusinessScreen: {screen: BusinessScreen} })},
    Education: {screen: StackNavigator({ 
        BaseEducationScreen: {screen: EducationScreen} })},
    Finance: {screen: StackNavigator({ 
        BaseFinanceScreen: {screen: FinanceScreen} })},
    FoodBev: {screen: StackNavigator({ 
        BaseFoodBevScreen: {screen: FoodBevScreen} })},
    HealthCare: {screen: StackNavigator({ 
        BaseHealthCareScreen: {screen: HealthCareScreen} })},
    MarketAdvert: {screen: StackNavigator({ 
        BaseMarketAdvertScreen: {screen: MarketAdvertScreen } })},
    Retail: {screen: StackNavigator({ 
        BaseRetailScreen: {screen: RetailScreen } })},
    LifeSciences: {screen: StackNavigator({ 
        BaseLifeSciencesScreen: {screen: LifeSciencesScreen } })},
    Telecom: {screen: StackNavigator({ 
        BaseTelecomScreen: {screen: TelecomScreen } })},
    Infrastructure: {screen: StackNavigator({ 
        BaseInfrastructureScreen: {screen: InfrastructureScreen } })},
    EnergyChemicals: {screen: StackNavigator({ 
        BaseEnergyChemicalsScreen: {screen: EnergyChemicalsScreen } })},
    AviationAerospace: {screen: StackNavigator({ 
        BaseAviationAerospaceScreen: {screen: AviationAerospaceScreen } })},
    TravelHospitality: {screen: StackNavigator({ 
        BaseTravelHospitalityScreen: {screen: TravelHospitalityScreen } })},
    MyAccount: {screen: StackNavigator({ 
        BaseMyAccountScreen: {screen: Launcher } })},
}, {
    contentComponent: props => <ScrollView><DrawerItems {...props} /></ScrollView>
  }
)


export default class App extends React.Component { 
  render() {
    return (
      <View style={styles.container}>
        <Application screenProps={title="hello"} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 22,
    
  },
  storyStyles: {
    flex: 1,
    flexDirection: 'row',
  },
  outerStyle: {
    flexDirection: 'column',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  headerStyle: {
    flex: 0.7,
    flexDirection: 'row',
    fontWeight: '300',
    fontSize: 25,
    color: '#097ABF',
    paddingTop: 5,
  },
    summaryStyle: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 18,
    color: '#666',
    lineHeight: 20,
    paddingTop: 10,


  },
    imageStyle: {
          flex: 0.3,
    flexDirection: 'row',
       width: 100, 
       height: 100,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
