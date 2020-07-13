import React, { Component } from "react";
import './carousel.scss'
class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: 1,
          active: true,
          path: 'logo192.png'
        },
        {
          name: 2,
          active: false,
          path: 'galaxy.jpg'
        },
        {
          name: 3,
          active: false,
          path: 'black_hole.jpeg'
        },
      ]
    }
    this.changeLeft = this.changeLeft.bind(this)
    this.changeRight = this.changeRight.bind(this)
  }
  changeItem(direction){
    const { items } = this.state
    let currentIndex = items.findIndex(item => item.active === true)
    items[currentIndex].active = false
    if(direction === 'left'){
      currentIndex--
    } else {
      currentIndex++
    }
    if(currentIndex >= items.length){
      currentIndex = 0
    }
    if(currentIndex < 0){
      currentIndex = items.length - 1
    }
    items[currentIndex].active = true
    this.setState({
      items: items
    })
  }
  changeLeft(){
    this.changeItem('left')
  }
  changeRight(){
    this.changeItem('right')
  }
  render() {
    return (
      <div className="carousel">
        <div className="container">
          <ul>
            {this.state.items.map((item, i) => {
              return (<li key={i} className={item.active ? "active" : "hide"}>
                <img title={ item.name } src={item.path}/></li>)
            })}
          </ul>
        </div>
        <div className="pagination">
          <span onClick={this.changeLeft}> Left </span>
          <span onClick={this.changeRight}> Right </span>
        </div>
      </div>
    );
  }
}

