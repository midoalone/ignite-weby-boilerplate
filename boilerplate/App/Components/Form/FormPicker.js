import { TouchableOpacity, View, FlatList, ScrollView } from 'react-native'
import styles from './FormsStyle'
import Colors from '../../Themes/Colors'
import { Icon, Text } from 'native-base'
import React, { Component } from 'react'
import ZadModal from '../Modals/Modal'
import PropTypes from 'prop-types'
import { regularFont } from '../../Config/Globals'

export default class FormPicker extends Component {
    state = {
        selectedItems: this.props.selectedItems ? this.props.selectedItems : []
    }
    
    constructor (props) {
        super(props)
        
        this.modalOptions = {
            renderer: this.renderPicker(),
            title: props.placeholder
        }

        console.log(props)
    }
    
    renderPicker () {
        let {items, mapping, acceptTitle, single} = this.props
        let {selectedItems} = this.state

        return (
            <View>
                {!single && selectedItems.length > 0 ? <ScrollView horizontal={true} style={{
                    borderBottomWidth: 0.2,
                    borderColor: '#e1e1e1',
                    paddingBottom: 10,
                    marginBottom: 10,
                    height: 33
                }} showsHorizontalScrollIndicator={false}>
                    {selectedItems.map((item) => (
                        <TouchableOpacity style={{
                            backgroundColor: Colors.background,
                            borderRadius: 4,
                            paddingHorizontal: 5,
                            marginRight: 5,
                            flexDirection: 'row'
                        }} onPress={() => {
                            let filteredItems = selectedItems.filter((i) => i.id !== item[mapping.id])
                            this.setState({
                                selectedItems: filteredItems
                            })
                        }}>
                            <Text style={{
                                fontSize: 13,
                                lineHeight: 16,
                                paddingTop: 4,
                                paddingBottom: 0,
                                marginRight: 5,
                            }}>{item.title ? item.title : item[mapping.title]}</Text>
                            <Icon name={'close'}
                                  style={{fontSize: 13, color: '#9b1814', top: 4}}/>
                        </TouchableOpacity>
                    ))}
                </ScrollView> : null}
                
                <View style={{height: 200}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={items}
                        extraData={this.state}
                        renderItem={({item}) => {
                            let id = item.id ? item.id : item[mapping.id],
                                title = item.title ? item.title : item[mapping.title]

                            let isSelected = selectedItems.find((i) => i.id === item[mapping.id])

                            return (
                                <TouchableOpacity style={{flexDirection: 'row', paddingVertical: 5, flex: 1}}
                                                  onPress={() => {
                                                      if(single) {
                                                          this.setState({
                                                              selectedItems: [{
                                                                  id, title
                                                              }]
                                                          }, () => {
															  ZadModal.hide()
															  this.props.onChange(this.state.selectedItems)
														  })
                                                      }else{
                                                          if (!isSelected) {
                                                              this.setState({
                                                                  selectedItems: [...selectedItems, {
                                                                      id, title
                                                                  }]
                                                              })
                                                          } else {
                                                              let filteredItems = selectedItems.filter((i) => i.id !== item[mapping.id])
                                                              this.setState({
                                                                  selectedItems: filteredItems
                                                              })
                                                          }
                                                      }
                                                  }}>
                                    <Icon name={'md-checkmark'}
                                          style={{fontSize: 20, color: isSelected ? Colors.panther : '#ccc'}}/>
                                    <Text style={{
                                        marginLeft: 10,
                                        top: 2,
                                        color: isSelected ? Colors.brand : '#333'
                                    }}>{title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>

				{!single ? <TouchableOpacity
                    style={{backgroundColor: Colors.main, alignItems: 'center', height: 35, borderRadius: 5}}
                    onPress={() => {
                        ZadModal.hide()
                        this.props.onChange(this.state.selectedItems)
                    }}
                >
                    <Text style={{color: '#fff', top: 8}}>{acceptTitle}</Text>
                </TouchableOpacity> : null}
            </View>
        )
    }
    
    componentDidUpdate () {
        ZadModal.update({
            ...this.modalOptions,
            renderer: this.renderPicker()
        })
    }
    
    render () {
        let {label, mapping, placeholder, single} = this.props
        let {selectedItems} = this.state

        return (
            <View>
                <TouchableOpacity
                    onPress={() => ZadModal.show({
                        ...this.modalOptions,
                        renderer: this.renderPicker()
                    })} activeOpacity={0.9}>
                    
                    {!single && selectedItems.length > 0 ? <ScrollView horizontal={true} style={{
                        paddingVertical: 5,
                        marginRight: 30
                    }} showsHorizontalScrollIndicator={false}>
                        {selectedItems.map((item) => (
                            <TouchableOpacity style={{
                                backgroundColor: Colors.background,
                                borderRadius: 4,
                                paddingHorizontal: 5,
                                marginRight: 5,
                                flexDirection: 'row'
                            }} onPress={() => {
                                let filteredItems = selectedItems.filter((i) => i.id !== item.id)
                                this.setState({
                                    selectedItems: filteredItems
                                })
                            }}>
                                <Text style={{
                                    fontSize: 13,
                                    lineHeight: 16,
                                    paddingTop: 4,
                                    paddingBottom: 0,
                                    marginRight: 5,
                                }}>{item.title ? item.title : item[mapping.title]}</Text>
                                <Icon name={'close'}
                                      style={{fontSize: 13, color: '#9b1814', top: 4}}/>
                            </TouchableOpacity>
                        ))}
                    </ScrollView> : single && selectedItems.length === 1 ? <Text
						style={[
							styles.pickerLabel,
							{color: Colors.brand}
						]}>
						{selectedItems[0].title ? selectedItems[0].title : selectedItems[0][mapping.title]}
					</Text> : <Text
                        style={[
                            styles.pickerLabel,
                            {color: Colors.grayDarker}
                        ]}>
                        {placeholder ? placeholder : label}
                    </Text>}
                    
                    <Icon name={'ios-arrow-down'} style={styles.pickerArrow}/>
                </TouchableOpacity>
            </View>
        )
    }
}

FormPicker.propTypes = {
    items: PropTypes.array,
    selectedItems: PropTypes.array,
}

FormPicker.defaultProps = {
    items: [],
    selectedItems: [],
}
