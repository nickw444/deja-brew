import { action, observable, runInAction } from 'mobx';
import { UpdateCafeRequest, UpdateCafeResponse } from 'services/cafe/cafe_dto';
import { CafeService } from 'services/cafe/cafe_service';

export class CafeStatusStore {
  @observable.ref
  acceptingOrders: boolean | undefined;

  @observable.ref
  hasPendingUpdate: boolean = false;
}


export class CafeStatusPresenter {
  constructor(
      private readonly cafeService: CafeService,
  ) {
  }

  startRefreshing(store: CafeStatusStore) {
    window.setInterval(() => this.refreshStatus(store), 10000);
  }

  async refreshStatus(store: CafeStatusStore) {
    const resp = await this.cafeService.getCafe();

    runInAction(() => {
      store.acceptingOrders = resp.cafe.acceptingOrders;
    });
  }

  @action
  async toggleStatus(store: CafeStatusStore) {
    store.hasPendingUpdate = true;

    let resp: UpdateCafeResponse | undefined;
    try {
      resp = await this.cafeService.updateCafe(new UpdateCafeRequest({
        acceptingOrders: !store.acceptingOrders,
      }));
    } catch (e) {
      // Ignore error
    }

    runInAction(() => {
      store.hasPendingUpdate = false;
      if (resp != null) {
        store.acceptingOrders = resp.cafe.acceptingOrders;
      }
    });
  }
}
