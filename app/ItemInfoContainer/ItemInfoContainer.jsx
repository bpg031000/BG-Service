import React from 'react';
import axios from 'axios';
import css from '../../node_modules/bootstrap/dist/css/bootstrap.css';
import itemInfoCSS from './item-info.css';

import ItemHeading from './ItemHeading/ItemHeading.jsx'
import ItemInfoPriceOptions from './ItemInfoPriceOptions/ItemInfoPriceOptions.jsx';
import ItemInfoOrdering from './ItemInfoOrdering/ItemInfoOrdering.jsx';
import ItemInfoDetails from './ItemInfoDetails/ItemInfoDetails.jsx';
import ItemInfoShipping from './ItemInfoShipping/ItemInfoShipping.jsx';
import ItemInfoPolicies from './ItemInfoPolicies/ItemInfoPolicies.jsx';
import ItemInfoFaqs from './ItemInfoFaqs/ItemInfoFaqs.jsx';
import ItemInfoMeetSeller from './ItemInfoMeetSeller/ItemInfoMeetSeller.jsx';

class ItemInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      item:{
      "itemId":"",
      "itemName":"",
      "categoryId":"",
      "categoryName":"",
      "storeName":"",
      "shopLogo":"",
      "shopTotalSales":"",
      "shopStartYear":"",
      "shopCountry":"",
      "storeOwnerName":"",
      "storePolicies":{
          "exchanges":true,
          "returns":true,
          "refunds":true,
          "paymentsAccepted":{
              "Credit/Debit":true,
              "Paypal":true,
              "Etsy Credit/Gift":true
          }
      },
      "storeFreeShippingTotal":0,
      "storeId":"",
      "storeRating":"",
      "imageArray":[],
      "relatedItemImage":"",
      "itemRating":"",
      "badges-bestseller":true,
      "badges-trending":true,
      "singlePrice":0,
      "pricedOptions":[],
      "unpricedOptions":[],
      "customOptions":[],
      "maxQuantity":1,
      "inserts-niceChoice":true,
      "inserts-othersWant":true,
      "quickFacts-handmade":true,
      "quickFacts-materials":"",
      "description":"",
      "shipTime":"",
      "shipFrom":"",
      "shipCost":0,
      "faqs":[{question: '', answer: ''}],
      "":""
      },
      loading:true,
      order:{itemId: this.state.item.itemId}
    }
    this.quickFactsDefault = [
      {
        type: 'badge',
        label: 'handmade',
      },
      {
        type: 'detail',
        label: 'materials',
        text: 'materials'
      }
    ]
    document.addEventListener('onNavigate', ({id}) => {
      console.log("change pages to: ", id);
      // axios.get(`http://etsy-poc-item-info.us-east-2.elasticbeanstalk.com/items/${id}`)
      axios.get(`http://localhost:4321/items/${id}`)
      .then(res=>{
        console.log(res.data);
        this.setState({item: res.data, loading:false});
      })
      //change view based off of id
      //setState to render new item
    });
    // document.addEventListener('addToCart', ()=>{
    //   console.log('add to cart clicked');
    // });
  }

  componentDidMount(){
    // axios.get('http://etsy-poc-item-info.us-east-2.elasticbeanstalk.com/items/1')
    axios.get('http://localhost:4321/items/1')
    .then(res=>{
      console.log(res.data);
      this.setState({item: res.data, loading:false});
    })
  }

  onAddToCart(event, order){
    let addToCartEvent = new Event("addToCart", { bubbles: true });
    addToCartEvent.order = order;
    event.target.dispatchEvent(addToCartEvent);
  }

  // onOptionChange(optionKey, optionValue){
  //   this.setState({order:{`${optionKey}`: optionValue}});
  // }

  render() {
    if(this.state.loading){
      return (
        <div className='item-info-loading container'>
          Loading...
        </div>
      )
    } else{
        return (
          <div className='item-info container'>
          {/* <h1>Item Info Container</h1> */}
          <ItemHeading
            storeName={this.state.item.storeName || ''}
            storeRating={this.state.item.itemRating || ''}
            storeReviews={this.state.item.shopTotalSales || ''}
            itemName={this.state.item.itemName || ''}
            badges={this.state.item.badges || ['Bestseller', 'Trending']}
          />
          <ItemInfoPriceOptions
            singlePrice={this.state.item.singlePrice || 0} 
            pricedOptions={this.state.item.pricedOptions || []}
            unpricedOptions={this.state.item.unpricedOptions || []}
            customOptions={this.state.item.customOptions || ''}
            maxQuantity={this.state.item.maxQuantity || 1}
          />
          <ItemInfoOrdering
            inserts={this.state.item.inserts || ['niceChoice', 'othersWant']}
            onAddToCart={this.onAddToCart.bind(this)}
            order={this.state.order}
            />
          <ItemInfoDetails
            // quickFactsHandmade={this.state.item['quickFacts-handmade']}
            // quickFactsMaterials={this.state.item['quickFacts-materials']}
            description={this.state.item.description || ''}
            />
          <ItemInfoShipping
            shipTime={this.state.item.shipTime || ''}
            shipFrom={this.state.item.shipFrom || ''}
            shipCost={this.state.item.shipCost || ''}
          />
          <ItemInfoPolicies
            exchanges={this.state.item.storePolicies.exchanges || ''}
            returns={this.state.item.storePolicies.returns || ''}
            refunds={this.state.item.storePolicies.refunds || ''}
            paymentsAccepted={this.state.item.storePolicies.paymentsAccepted || ''}
            customPolicies={this.state.item.storePolicies.custom || ''}
            />
          <ItemInfoFaqs
            faqs={this.state.item.faqs || []}
            />
          <ItemInfoMeetSeller
            storeOwnerName={this.state.item.storeOwnerName || ''}
            storeName={this.state.item.storeName || ''}            
          />
        </div>
      );
    }
  }
}

export default ItemInfoContainer;