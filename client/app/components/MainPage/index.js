import React from 'react';
import Masonry from 'react-masonry-infinite';
import axois from 'axios';
import SearchBar from 'material-ui-search-bar'
import Card from '../Card/Card';
import shortId from 'shortid'

export default class MainPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        scrollkey: shortId.generate(),
        keyword:'',
        onStart: true,        
        hasMore: true,
        elements: [],
        object: {},
        count: 0
      };
  }     

  getElements = () => {
    if(this.state.onStart) {
        this.setState({onStart:false})
        return null;
    }
    axois.get(`/api/data`,{
        params: {
            count: this.state.count,
            filter_key: this.state.keyword
        }
    })
      .then(res => {
          const isEmpty = false
          if(res.data.length < 20 ) {
            isEmpty = true;
          }
          this.setState(state => ({
            elements: state.elements.concat(res.data),            
          }));
          if(!isEmpty) {
            this.setState(state => ({
                count: state.count + 1
            }));
          }
          return res.data;
        
      })    
      return null;
  };

    getSearchResult = (value) =>  
    {
        this.setState({
            scrollkey: shortId.generate(),
            keyword: value,
            onStart: false,        
            hasMore: true,
            elements: [],
            object: {},
            count: 0
        }, () => {
            this.getElements(); 
        });
                   
    }

  loadMore = () => setTimeout(() => this.getElements(), 1500);

  render(){
    const { hasMore, elements, keyword, onStart, scrollkey} = this.state;    
    return(
      <div className='main-page'>
                <div className='page-search' style ={{marginBottom:'20px'}}> 
                    <SearchBar
                        onChange={newValue => this.setState({ keyword: newValue })}
                        onRequestSearch={this.getSearchResult}
                        style={{
                            margin: '0 auto',
                            maxWidth: '80%',
                        }}
                    />               
                </div>
                <div className='page-content'>
                    <Masonry
                        key = {scrollkey}
                        className='masonry'
                        hasMore={hasMore}
                        sizes = {[
                            { columns: 1, gutter: 20 }, 
                            { mq: '768px', columns: 2, gutter: 20 }, 
                            { mq: '1024px', columns: 3, gutter: 20 }, 
                            { mq: '1200px', columns: 4, gutter: 20 },
                            { mq: '1500px', columns: 5, gutter: 20 },
                            { mq: '1800px', columns: 6, gutter: 20 },
                            { mq: '2300px', columns: 7, gutter: 20 },
                            { mq: '2600px', columns: 8, gutter: 20 },
                            { mq: '2800px', columns: 9, gutter: 20 },
                            { mq: '3100px', columns: 10, gutter: 20 }                            
                        ]}
                        loader={
                            <div className="sk-folding-cube">
                              <div className="sk-cube1 sk-cube" />
                              <div className="sk-cube2 sk-cube" />
                              <div className="sk-cube4 sk-cube" />
                              <div className="sk-cube3 sk-cube" />
                            </div>
                          }
                          loadMore={this.loadMore}
                          
                    >
                        {
                            onStart ? '' : (elements.map((element, i) => (
                                <Card key = {i} card_data = {element} selected = {keyword}/>
                            )))
                        }
                    </Masonry>
                </div>
            </div>
    )
  }
}
