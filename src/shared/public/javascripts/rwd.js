import $ from 'jquery';

export const playerWindow = (_detectionBlock) => {
  if (_detectionBlock.current != null){
    const $block = $(_detectionBlock.current);
    const action = () => {
      return $block.width() / 1.7777;
    };
    $(window).resize( () => {
      return action();
    });
    return action();
  }
}