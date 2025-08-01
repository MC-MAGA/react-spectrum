/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {Button, ColorSpace, ColorSwatchPicker, ColorSwatchPickerItem, Dialog, DialogTrigger, getColorChannels, Input, Label, Popover} from '../src';
import {ColorAreaExampleRender} from './ColorArea.stories';
import {ColorField} from '../src/ColorField';
import {ColorPicker} from '../src/ColorPicker';
import {ColorSliderExampleRender} from './ColorSlider.stories';
import {ColorSwatchExampleRender} from './ColorSwatch.stories';
import {Meta, StoryObj} from '@storybook/react';
import React, {useState} from 'react';
import './styles.css';

export default {
  title: 'React Aria Components/ColorPicker',
  component: ColorPicker
} as Meta<typeof ColorPicker>;

export type ColorPickerStory = StoryObj<typeof ColorPicker>;

function ColorPickerExampleRender(args) {
  let [format, setFormat] = useState<ColorSpace | 'hex'>('hex');
  return (
    <ColorPicker {...args} defaultValue="rgb(255, 0, 0)">
      <ColorPickerTrigger>
        <ColorAreaExampleRender colorSpace="hsb" xChannel="saturation" yChannel="brightness" />
        <ColorSliderExampleRender colorSpace="hsb" channel="hue" />
        <ColorSliderExampleRender channel="alpha" />
        <label>
          {'Format: '}
          <select value={format} onChange={e => setFormat(e.target.value as ColorSpace | 'hex')}>
            <option>hex</option>
            <option>rgb</option>
            <option>hsl</option>
            <option>hsb</option>
          </select>
        </label>
        <div style={{display: 'flex', gap: 4, width: 192}}>
          {format === 'hex'
            ? (
              <ColorField style={{display: 'flex', flexDirection: 'column'}}>
                <Label>Hex</Label>
                <Input />
              </ColorField>
            ) : getColorChannels(format).map(channel => (
              <ColorField key={channel} colorSpace={format} channel={channel} style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <Label />
                <Input style={{width: '100%', boxSizing: 'border-box'}} />
              </ColorField>
            ))}
        </div>
        <ColorSwatchPicker
          style={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap'
          }}>
          {['#f00', '#ff0', '#0ff', '#00f'].map(color => (
            <ColorSwatchPickerItem
              color={color}
              style={({isFocusVisible}) => ({
                outline: isFocusVisible ? '2px solid lightblue' : 'none',
                outlineOffset: 2,
                borderRadius: 4,
                position: 'relative'
              })}>
              {({isSelected}) => (<>
                <ColorSwatchExampleRender />
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      border: '2px solid black',
                      outline: '2px solid white',
                      outlineOffset: -4,
                      borderRadius: 4
                    }} />
                )}
              </>)}
            </ColorSwatchPickerItem>
          ))}
        </ColorSwatchPicker>
      </ColorPickerTrigger>
    </ColorPicker>
  );
}

export const ColorPickerExample: ColorPickerStory = {
  render: (args) => <ColorPickerExampleRender {...args} />
};

function ColorPickerSlidersRender(args) {
  let [colorSpace, setColorSpace] = useState<ColorSpace>('rgb');
  return (
    <ColorPicker {...args} defaultValue="rgb(255, 0, 0)">
      {({color}) => (
        <ColorPickerTrigger>
          <label>
            {'Color Space: '}
            <select value={colorSpace} onChange={e => setColorSpace(e.target.value as ColorSpace)}>
              <option>rgb</option>
              <option>hsl</option>
              <option>hsb</option>
            </select>
          </label>
          {color.toFormat(colorSpace).getColorChannels().map(c => <ColorSliderExampleRender key={c} colorSpace={colorSpace} channel={c} />)}
          <ColorSliderExampleRender channel="alpha" />
        </ColorPickerTrigger>
      )}
    </ColorPicker>
  );
}

export const ColorPickerSliders: ColorPickerStory = {
  render: (args) => <ColorPickerSlidersRender {...args} />
};

function ColorPickerTrigger({children}) {
  return (
    <DialogTrigger>
      <Button style={{background: 'none', border: 'none', padding: 0}}>
        <ColorSwatchExampleRender aria-label="Color picker" />
      </Button>
      <Popover
        placement="bottom start"
        style={{
          background: 'Canvas',
          color: 'CanvasText',
          border: '1px solid gray',
          borderRadius: 4,
          padding: 12,
          zIndex: 5,
          overflow: 'auto',
          fontSize: 'small',
          boxSizing: 'border-box'
        }}>
        <Dialog style={{outline: 'none', display: 'flex', flexDirection: 'column', gap: 8}}>
          {children}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
