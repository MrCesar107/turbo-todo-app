class ListsController < ApplicationController
  def create
    @list = List.new(list_params)

    if @list.save
      render json: { list: @list, status_code: "200" }, status: :ok
    else
      render json: { errors: @list.errors, status_code: "400" }, status: :bad_request
    end
  end

  def index
    @lists = List.all

    render json: { lists: @lists, status_code: "200" }, status: :ok
  end

  def update
    @list = List.find(params[:id])

    if @list.update(list_params)
      render json: { list: @list, status_code: "200" }, status: :ok
    else
      render json: { errors: @list.errors, status_code: "400" }, status: :bad_request
    end
  end

  def destroy
    @list = List.find(params[:id])

    if @list.destroy
      render json: { message: "List deleted successfully", status_code: "200" }, status: :ok
    else
      render json: { errors: @list.errors, status_code: "400" }, status: :bad_request
    end
  end

  private

  def list_params
    params.require(:list).permit(:name)
  end
end
