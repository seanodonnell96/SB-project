import React from 'react';
import { AppRegistry, Image, WebView } from 'react-native';
import { StyleSheet, SectionList, ScrollView, Button, Alert, Text, TextInput, View } from 'react-native';
import {StackNavigator, DrawerNavigator, TabNavigator, DrawerItems, NavigationActions } from 'react-navigation';

/* GenericScreen
*  A generic screen that each of the specific screens use to display data
*  fetches the stories for each selection
*     Then inserts each individual story into the stories array
*/
class GenericScreen extends React.Component {
    constructor() {
        super();
        
        this.state = {
            stories: [],
            fetching: false
        }
    }
  static navigationOptions = ({navigation}) => ({headerLeft: <Button onPress={() => navigation.navigate('DrawerOpen')} title="Open" />, headerStyle: {backgroundColor: '#247FB6', height: 60, }}) 
  sortByDate(stories){
        return stories.sort( (a, b) => b.order - a.order);
  }
  fetchData()  {
    var _this = this;
  fetch(`http://www.smartbrief.com/endpoint/${this.props.navigation.state.routeName}`)
      .then(function(response){
        return response.json();

      })
      .then(this.sortByDate)
      .then(function(data) { 
      	  _this.setState({
            
            stories: data
          });
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    this.fetchData();
    return (
      
      <ScrollView>
        {
          this.state.stories.map( (story, index) => {
          return <Story key={index} story={story} clickHandler={ () => navigate('FullBriefScreen', {image_url: story.image_url, headline: story.headline, summary: story.summary, url: story.source[0].url})}  />})
        }
      </ScrollView>
    )
  }
}

class FullBriefScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({headerStyle: {backgroundColor: '#247FB6', height: 60}}) 
  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <FullBrief headline={params.headline} image_url={params.image_url} summary={params.summary} clickHandler={ () => navigate('WebViewScreen', {url: params.url})} />
    )
  }
}

class WebViewScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <WebView
        source={{uri: params.url}}
        style={{marginTop: 20}}
      />
    );
  }
}

//displays the information for each story: the headline, the image and the summary
const Story = ({story, clickHandler = f => f}) => {
  if (story.image_url.length) {
    	return (
  <View style={styles.outerStyle} > 
    <View style={{flexDirection: 'row', flex: 1}}>      
  	    <Text style={styles.headerStyle} onPress={clickHandler}>{story.headline}</Text> 
        <Image source={{uri: story.image_url}} style={styles.imageStyle} />
    </View>
      <Text style={styles.summaryStyle} onPress={clickHandler}>{story.summary.substring(3, 80).concat('...')}</Text>
  </View>
  )
  } else {
	return (
  <View style={styles.outerStyle} >       
  	  <Text style={styles.headerStyle} onPress={clickHandler}>{story.headline}</Text>
      <Text style={styles.summaryStyle} onPress={clickHandler}>{story.summary.substring(3, 80).concat('...')}</Text>
  </View>
  )
  }

};

const FullBrief = (props) => {
  if (props.image_url.length) {
    	return (
        <ScrollView>
          <Image style={{height: 200, width: 450}} source={{uri: props.image_url}} />
  <View style={styles.outerStyle} >   
          
  	    <Text style={{fontWeight: '300', fontSize: 25, color: '#097ABF'}} onPress={props.clickHandler}>{props.headline}</Text> 
        <Text style={{fontSize: 18,color: '#666', lineHeight: 20}} onPress={props.clickHandler}>{props.summary.substring(3, (props.summary.length - 5))}</Text>
  </View>
  </ScrollView>
  )
  } else {
	return (
  <View style={styles.outerStyle} >       
  	  <Text style={{fontWeight: '300', fontSize: 25, color: '#097ABF',}} onPress={props.clickHandler}>{props.headline}</Text>
      <Text style={{fontSize: 18,color: '#666', lineHeight: 20}} onPress={props.clickHandler}>{props.summary.substring(3, (props.summary.length - 5))}</Text>
  </View>
  )
  }
  
}

/* Application consists of a Drawer Navigator, which will allow for the sidebar menu that is found in the app
*   Each selection in the sidebar has its own entry in the drawerNavigator
*     These entries are a Stack Navgator, to allow the user to travel back and forth between screens easily
*
*/
const Application =  DrawerNavigator({
      'Top Stories': {screen: StackNavigator({ 
        'top-stories': {screen: GenericScreen}, 
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
    })},
    Business: {screen: StackNavigator({ 
        'industry/business': {screen: GenericScreen},
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
     })},
    Tech: {screen: StackNavigator({
      'industry/tech': {screen: GenericScreen}, 
      FullBriefScreen: {screen: FullBriefScreen},
      WebViewScreen: {screen: WebViewScreen},
  })},
    Education: {screen: StackNavigator({ 
        'industry/education': {screen: GenericScreen},
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
     })},
    Finance: {screen: StackNavigator({ 
        'industry/finance': {screen: GenericScreen}, 
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
    })},
    'Food & Beverage': {screen: StackNavigator({ 
        'industry/food+&+beverage': {screen: GenericScreen}, 
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
    })},
    'Health Care': {screen: StackNavigator({ 
        'industry/health+care': {screen: GenericScreen},
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
     })},
    'Marketing & Advertising': {screen: StackNavigator({ 
        'industry/marketing+&+advertising': {screen: GenericScreen},
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
     })},
    Retail: {screen: StackNavigator({ 
        'industry/retail': {screen: GenericScreen},
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
     })},
    'Life Sciences & Technology': {screen: StackNavigator({ 
        'industry/life+sciences+&+technology': {screen: GenericScreen},
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
     })},
    Telecom: {screen: StackNavigator({ 
        'industry/telecom': {screen: GenericScreen},
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
     })},
    Infrastructure: {screen: StackNavigator({ 
        'industry/infrastructure': {screen: GenericScreen},
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
        
     })},
    'Energy & Chemicals': {screen: StackNavigator({ 
        'industry/energy+&+chemicals': {screen: GenericScreen},
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
     })},
    'Aviation & Aerospace': {screen: StackNavigator({ 
        'industry/aviation+&+aerospace': {screen: GenericScreen},
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
     })},
    'Travel & Hospitality': {screen: StackNavigator({ 
        BaseTravelHospitalityScreen: {screen: GenericScreen, },
        FullBriefScreen: {screen: FullBriefScreen},
        WebViewScreen: {screen: WebViewScreen},
     })},
}, {
  drawerWidth: 250,
    contentComponent: props => <ScrollView><DrawerItems {...props} /></ScrollView>,
  }
)
 

//export of app
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
    backgroundColor: '#247FB6',
    paddingTop: 5,
    
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
    paddingLeft: 20,
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
AppRegistry.registerComponent('SBapp', () => SeansApp);
