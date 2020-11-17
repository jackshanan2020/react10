import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Swiper from 'react-id-swiper';
import { ReactSVG } from 'react-svg';
import { Rating } from '../../components';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import {
	getDiscountPrice,
	getProductCartQuantity,
} from '../../helpers/product';
import { addToCartDispatch } from '../../redux/actions/cartActions';
import { addToWishlistDispatch } from '../../redux/actions/wishlistActions';

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedProductColor: props.product.variation
				? props.product.variation[0].color
				: '',
			productStock: props.product.variation
				? props.product.variation[0].stock
				: props.product.stock,
			quantityCount: 1,
		};
	}
	render() {
		const {
			product,
			cartItems,
			wishlistItems,
			addToCart,
			addToWishlist,
		} = this.props;
		const { selectedProductColor, productStock, quantityCount } = this.state;
		const params = {
			loop: true,
			speed: 1000,
			watchSlidesVisibility: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		};
		const wishlistItem = wishlistItems.filter(
			(wishlistItem) => wishlistItem.id === product.id
		)[0];

		const productCartQty = getProductCartQuantity(
			cartItems,
			product,
			selectedProductColor
		);
		return (
			<div className='body-wrapper space-pt--70 space-pb--120'>
				{/*====================  product image slider ====================*/}
				<div className='product-image-slider-wrapper space-pb--30 space-mb--30'>
					<Swiper {...params}>
						{product.galleryImage &&
							product.galleryImage.map((single, key) => {
								return (
									<div key={key}>
										<div className='product-image-single swiper-slide'>
											<img
												src={process.env.PUBLIC_URL + single}
												style={{ height: '200px' }}
												//	className='img-fluid'
												alt=''
											/>
										</div>
									</div>
								);
							})}
					</Swiper>
				</div>
				{/*====================  End of product image slider  ====================*/}

				{/*====================  product content ====================*/}
				{/* product content header */}
				{/* <div className='product-content-header-area border-bottom--thick space-pb--30'>
					<div className='container'>
						<div className='row'>
							<div className='col-12'>
								<div className='product-content-header'>
									<div className='product-content-header__main-info'>
										<h3 className='title'>{product.name}</h3>
										<div className='price'>
											{product.discount && product.discount > 0 ? (
												<Fragment>
													<span className='main-price mr-1'>{`BDT ${product.price}`}</span>
													<span className='discounted-price'>{`BDT ${getDiscountPrice(
														product.price,
														product.discount
													)}`}</span>
												</Fragment>
											) : (
												<span className='discounted-price'>{`BDT ${product.price}`}</span>
											)}
										</div>
										<div className='rating'>
											{product.rating > 1 ? (
												<Fragment>
													<ul className='rating__stars'>
														<Rating ratingValue={product.rating} />
													</ul>
													<span className='rating__text'>
														{product.ratingCount}
													</span>
												</Fragment>
											) : (
												''
											)}
										</div>
									</div>
									<div className='product-content-header__wishlist-info text-center'>
										<ReactSVG
											src={
												process.env.PUBLIC_URL +
												'/assets/img/icons/heart-dark.svg'
											}
										/>
										<span className='count'>{product.wishlistCount}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> */}
				{/* product content description */}
				{/* <div className='product-content-description border-bottom--thick space-pt--25 space-pb--25'>
					<div className='container'>
						<div className='row'>
							<div className='col-12'>
								<p className='space-mb--25'>{product.shortDescription}</p>
								<h4 className='space-mb--5'>Free Shipping</h4>
								<p>
									To Bangladesh from seller via china. Shipping <br /> method
									online.
								</p>
							</div>
						</div>
					</div>
				</div> */}
				{/* product content safety */}

				<div className='grand-total space-mt--20'>
					<Container>
						<Row>
							<Col xs={6} md={4}>
								<div className='title-wrap'>
									<div>Warning –</div>
									<h4 className='cart-bottom-title'>
										READ THE DESCRIPTION BEFORE ORDER
									</h4>
									<p>*নিজের যে কোন একটি নিতে পারবেন!</p>
									<p>*ইভেন্ট টপ-আপ ৫০% কাউন্ট হবে !</p>
									<p>
										* Please Check available or not! on you id from here :
										ggtopup.com
									</p>
								</div>
								<button>See more</button>
							</Col>
							<Col xs={12} md={8}>
								<Card style={{ marginBottom: 10 }}>
									<Card.Header>
										<h3>
											<Badge pill variant='danger'>
												Step 1
											</Badge>
										</h3>
									</Card.Header>
									<Card.Body>
										<Card.Text>
											<Form.Label>Enter Player ID</Form.Label>
											<Form.Group>
												<Form.Control
													type='text'
													placeholder='Enter Player ID'
												/>
											</Form.Group>
										</Card.Text>
										{/* <Button variant='primary'>Go somewhere</Button> */}
									</Card.Body>
								</Card>
								<Card style={{ marginBottom: 10 }}>
									<Card.Header>
										<h3>
											<Badge pill variant='danger'>
												Step 2
											</Badge>
										</h3>
									</Card.Header>
									<Card.Body>
										<Card.Text>
											<Form.Label>Select Recharge</Form.Label>
											<Row md={4}>
												{[
													'Weakly',
													'Monthly',
													'200 Diamond',
													'620 Diamond',
													'1200 Diamond',
												].map((item) => (
													<Col key={item}>
														<Card
															style={{
																padding: '7px',
																marginBottom: '15px',
															}}
														>
															<span>
																{item}
																<sup style={{ marginLeft: 2, color: 'red' }}>
																	BDT 200
																</sup>
															</span>
														</Card>
													</Col>
												))}
											</Row>
										</Card.Text>
										{/* <Button variant='primary'>Go somewhere</Button> */}
									</Card.Body>
								</Card>
								<Card style={{ marginBottom: 10 }}>
									<Card.Header>
										<h3>
											<Badge pill variant='danger'>
												Step 3
											</Badge>
										</h3>
									</Card.Header>
									<Card.Body>
										<Card.Text style={{ textAlign: 'center' }}>
											You Need BDT 1400 to purchase the product
										</Card.Text>
										{/* <Button variant='primary'>Go somewhere</Button> */}
									</Card.Body>
								</Card>
								<div style={{ float: 'right' }}>
									<Button variant='primary' size='lg' active>
										Buy Now
									</Button>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
				{/* <div className='product-content-safety border-bottom--thick space-pt--15 space-pb--15'>
					<div className='container'>
						<div className='row'>
							<div className='col-12'>
								<h4>
									<ReactSVG
										src={
											process.env.PUBLIC_URL + '/assets/img/icons/security.svg'
										}
									/>{' '}
									Secure Payment Method.
								</h4>
								READ THE DESCRIPTION BEFORE ORDER – * Please Check av
							</div>
						</div>
					</div>
				</div> */}
				{/* {product.variation ? (
					<div className='product-color-picker border-bottom--thick space-pt--25 space-pb--25'>
						<div className='container'>
							<div className='row'>
								<div className='col-12'>
									<h3 className='space-mb--20'>Color Select</h3>
									<form>
										<ul className='color-picker'>
											{product.variation.map((el, key) => {
												return (
													<li key={key}>
														<input
															id={el.color}
															type='radio'
															name='color'
															defaultValue={el.color}
															defaultChecked={key === 0 ? true : false}
															onChange={() => {
																this.setState({
																	selectedProductColor: el.color,
																	productStock: el.stock,
																	quantityCount,
																});
															}}
														/>
														<label className={el.color} htmlFor={el.color} />
													</li>
												);
											})}
										</ul>
									</form>
								</div>
							</div>
						</div>
					</div>
				) : (
					''
				)} */}

				{/* product content description */}
				{/* <div className='product-content-description space-pt--25 space-pb--25'>
					<div className='container'>
						<div className='row'>
							<div className='col-12'>
								<h4 className='space-mb--5'>Specification</h4>
								<p>{product.fullDescription}</p>
							</div>
						</div>
					</div>
				</div> */}
				{/* shop product button */}
				{/* <div className='shop-product-button'>
					<button
						className='wishlist'
						disabled={wishlistItem !== undefined}
						onClick={() => addToWishlist(product)}
					>
						{' '}
						{wishlistItem !== undefined
							? 'ADDED TO WISHLIST'
							: 'ADD TO WISHLIST'}
					</button>
					{productStock && productStock > 0 ? (
						<button
							className='cart'
							onClick={() =>
								addToCart(product, quantityCount, selectedProductColor)
							}
							disabled={productCartQty >= productStock}
						>
							{productCartQty >= productStock ? 'STOCK END' : 'ADD TO CART'}
						</button>
					) : (
						<button className='cart' disabled>
							OUT OF STOCK
						</button>
					)}
				</div> */}
				{/*====================  End of product content  ====================*/}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const itemId = ownProps.match.params.id;
	return {
		product:
			state.productData.products &&
			state.productData.products.filter((single) => single.id === itemId)[0],
		wishlistItems: state.wishlistData,
		cartItems: state.cartData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToCart: (item, quantityCount, selectedProductColor) => {
			dispatch(addToCartDispatch(item, quantityCount, selectedProductColor));
		},
		addToWishlist: (item) => {
			dispatch(addToWishlistDispatch(item));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
