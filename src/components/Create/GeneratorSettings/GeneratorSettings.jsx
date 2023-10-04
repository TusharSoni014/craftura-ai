import React from "react";
import "./generator-settings.scss";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAmount,
  updateNegPrompt,
  updateSeed,
} from "../../../redux/slices/settingsSlice";
import { Button, Input, Select, Switch } from "antd";
import {
  clearPrevGenImages,
  updatePrevGenPreviewCount,
  updatePrevGenSettings,
  updatePrompt,
} from "../../../redux/slices/imageGenerateSlice";
import { randomPrompts } from "../../utils/utilFunctions";
import { BsStars } from "react-icons/bs";

const prevGenNumbers = [];
for (let i = 4; i <= 20; i++) {
  prevGenNumbers.push(i);
}

const amountNumber = [];
for (let i = 1; i <= 4; i++) {
  amountNumber.push(i);
}

const getColorForValue = (value) => {
  const percent = (value - 4) / (20 - 4);
  const red = Math.round(255 * percent);
  const green = Math.round(255 * (1 - percent));
  return `rgb(${red}, ${green}, 0)`;
};

export default function GeneratorSettings({
  setIsSettingsModalOpen,
  handleImageGenerate,
}) {
  const dispatch = useDispatch();
  const prompt = useSelector((state) => state.imageGenerateSlice.prompt);
  const negPrompt = useSelector((state) => state.settingsSlice.negPrompt);
  const seed = useSelector((state) => state.settingsSlice.seed);
  const amount = useSelector((state) => state.settingsSlice.amount);
  const privateMode = useSelector((state) => state.settingsSlice.privateMode);
  const enablePrevGen = useSelector(
    (state) => state.imageGenerateSlice.enablePrevGen
  );
  const prevGenPreviewCount = useSelector(
    (state) => state.imageGenerateSlice.prevGenPreviewCount
  );

  async function handleFetchRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * randomPrompts.length);
    const random = randomPrompts[randomIndex];
    dispatch(updatePrompt(random));
  }
  function handleGenerate(e) {
    setIsSettingsModalOpen(false);
    handleImageGenerate(e);
  }

  const handleSelectChange = (value) => {
    dispatch(updatePrevGenPreviewCount(value));
  };
  const handleAmountSelectChange = (value) => {
    dispatch(updateAmount(value));
  };

  const onPrevGenSwitchChange = (checked) => {
    dispatch(updatePrevGenSettings(checked));
    dispatch(clearPrevGenImages());
  };

  return (
    <div className="settings-modal-content">
      <div className="prompt-container">
        <small>Prompt:</small>
        <TextArea
          placeholder="Enter your prompt to generate your fantasy image"
          rows={5}
          cols={50}
          value={prompt}
          className="prompt-textarea"
          onChange={(e) => dispatch(updatePrompt(e.target.value))}
        />
        <div className="prompt-btn-container">
          <Button
            onClick={handleFetchRandomPrompt}
            className="random-prompt-btn"
            block
          >
            <BsStars /> Random Prompt
          </Button>
          <Button
            onClick={handleGenerate}
            className="generate-btn"
            type="primary"
            block
            disabled={prompt === ""}
          >
            Generate
          </Button>
        </div>
      </div>
      <div className="negative-prompt-container">
        <small>Negative Prompt:</small>
        <TextArea
          placeholder="Negative prompt (Blank negative prompt is not recommended)"
          rows={3}
          cols={50}
          value={negPrompt}
          className="negprompt-textarea"
          onChange={(e) => dispatch(updateNegPrompt(e.target.value))}
        />
      </div>
      <div className="seed-container">
        <small>Seed (Randomness of the image):</small>
        <Input
          value={seed}
          onChange={(e) => dispatch(updateSeed(e.target.value))}
          maxLength={10}
          placeholder="Seed (leave this empty for random seed)"
          onKeyPress={(e) => {
            const isValidInput = /^[0-9\b]+$/.test(e.key);
            if (!isValidInput) {
              e.preventDefault();
            }
          }}
        />
      </div>
      <div className="amount-selection-selector">
        <small>Amount of Images:</small>
        <Select
          disabled={privateMode}
          value={amount}
          defaultValue={amount}
          onChange={handleAmountSelectChange}
        >
          {amountNumber.map((number) => (
            <Select.Option key={number} value={number}>
              {number}
              {" ❑".repeat(number)}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="prev-gen-settings-container">
        <small>Previous Generations settings:</small>
        <div className="prevgen-settings">
          <p>Enable Previews:</p>
          <Switch
            className="prev-gen-toggle-switch"
            onChange={onPrevGenSwitchChange}
            checked={enablePrevGen}
          />
        </div>
        <div className="prevgen-settings">
          <p>Previous Generations Count:</p>
          <Select
            value={prevGenPreviewCount}
            defaultValue={prevGenPreviewCount}
            onChange={handleSelectChange}
            style={{ width: 120 }}
          >
            {prevGenNumbers.map((number) => (
              <Select.Option
                key={number}
                value={number}
                style={{ color: getColorForValue(number) }}
              >
                {number}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
